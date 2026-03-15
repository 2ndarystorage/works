import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "stripe-signature ヘッダーがありません" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook 署名検証エラー:", err);
    return NextResponse.json(
      { error: "Webhook 署名の検証に失敗しました" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      // サブスクリプションの決済完了
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      // サブスクリプションの更新（毎月の請求成功）
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }

      // 請求失敗
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }

      // サブスクリプションのキャンセル・終了
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      // サブスクリプションのプラン変更
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      default:
        console.log(`未処理のイベントタイプ: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook イベント処理エラー:", err);
    return NextResponse.json(
      { error: "イベント処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log("✅ 決済完了:", {
    sessionId: session.id,
    customerId: session.customer,
    subscriptionId: session.subscription,
    productId: session.metadata?.productId,
    amountTotal: session.amount_total,
    currency: session.currency,
    customerEmail: session.customer_details?.email,
  });

  // TODO: ここに実際のビジネスロジックを実装してください
  // 例:
  // - データベースにサブスクリプション情報を保存
  // - ユーザーにウェルカムメールを送信
  // - アクセス権限を付与
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log("💳 請求成功:", {
    invoiceId: invoice.id,
    customerId: invoice.customer,
    subscriptionId: invoice.subscription,
    amountPaid: invoice.amount_paid,
    currency: invoice.currency,
    periodStart: new Date((invoice.period_start ?? 0) * 1000).toISOString(),
    periodEnd: new Date((invoice.period_end ?? 0) * 1000).toISOString(),
  });

  // TODO: ここに実際のビジネスロジックを実装してください
  // 例:
  // - 請求書をデータベースに記録
  // - 次の請求期間のアクセスを更新
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.warn("❌ 請求失敗:", {
    invoiceId: invoice.id,
    customerId: invoice.customer,
    subscriptionId: invoice.subscription,
    amountDue: invoice.amount_due,
    attemptCount: invoice.attempt_count,
    nextPaymentAttempt: invoice.next_payment_attempt
      ? new Date(invoice.next_payment_attempt * 1000).toISOString()
      : null,
  });

  // TODO: ここに実際のビジネスロジックを実装してください
  // 例:
  // - ユーザーに支払い失敗の通知メールを送信
  // - 猶予期間を設定してサービスを継続
  // - 再試行回数が上限に達したらサービスを停止
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("🚫 サブスクリプション終了:", {
    subscriptionId: subscription.id,
    customerId: subscription.customer,
    canceledAt: subscription.canceled_at
      ? new Date(subscription.canceled_at * 1000).toISOString()
      : null,
  });

  // TODO: ここに実際のビジネスロジックを実装してください
  // 例:
  // - データベースのサブスクリプションステータスを更新
  // - アクセス権限を削除
  // - 解約確認メールを送信
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log("🔄 サブスクリプション更新:", {
    subscriptionId: subscription.id,
    customerId: subscription.customer,
    status: subscription.status,
    currentPeriodEnd: new Date(
      subscription.current_period_end * 1000
    ).toISOString(),
  });

  // TODO: ここに実際のビジネスロジックを実装してください
  // 例:
  // - プラン変更をデータベースに反映
  // - 新プランに応じた機能制限を更新
}
