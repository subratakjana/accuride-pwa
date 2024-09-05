import { I18nLink } from "@Components/Utilities";

const TermsAndConditions = () => (
  <>
    <h3 className="mb-3 text-uppercase">E COMMERCE TERMS AND CONDITIONS</h3>
    <p>
      These terms of sale pertain to online purchases made on Accuride.com only.
    </p>

    <h4>Payment</h4>
    <p>
      Accuride.com accepts Visa, MasterCard, American Express and Discover. We
      do not issue gift cards or website credits at this time.
    </p>

    <h4>Order Processing</h4>
    <p>
      Orders placed before 12pm Pacific Time are processed and shipped by end of
      business day. Orders placed after 12pm Pacific Time are processed by end
      of next business day.
    </p>
    <p>
      Accuride operating hours for order processing and customer service will be
      Monday through Friday from 9am to 5pm Pacific Time (excluding the
      following federal holidays).
    </p>
    <ul className="acc-default-li mb-3">
      <li>New Year’s Day</li>
      <li>Good Friday</li>
      <li>Memorial Day</li>
      <li>Independence Day</li>
      <li>Labor Day</li>
      <li>Thanksgiving Day</li>
      <li>Day After Thanksgiving Day</li>
      <li>Christmas Eve Day</li>
      <li>Christmas Day</li>
    </ul>
    <p>
      Order Changes – In the event that you need to change an order, you must
      contact customer service prior to receiving shipment confirmation.
      Otherwise, you will need to return the product once it is received as
      explained below.
    </p>

    <h4>Order Cancellation</h4>
    <p>
      In the event that you need to cancel an order, you must contact customer
      service prior to receiving a shipment confirmation. Once the order has
      shipped, we will not refund shipping charges and you will be responsible
      for return shipping charges.
    </p>

    <h4>Pricing</h4>
    <p>
      Online prices displayed on Accuride.com are subject to change at any time
      and without notice. Accuride reserves the right to offer a volume discount
      to customers based upon the quantity of products purchased in a single
      transaction.
    </p>
    <p>
      Volume discount pricing is subject to product availability and quantity
      limits may apply. Accuride reserves the right to accept or reject any
      volume discount order; or charge the full price for the product based on
      availability.
    </p>
    <h4>Tax</h4>
    <p>
      We are required by state law to collect sales tax on any order shipped to
      a state where we have a physical presence.
    </p>
    <h4>STATE &amp; LOCAL SALES TAXES</h4>
    <p>
      The terms contained herein are subject to change as the taxation of online
      transactions is continually evolving.
    </p>
    <p>
      Orders shipped to CA, IN, NC, OH, PA, TX, will have all applicable local
      and state sales taxes added to your total order and to your shipping
      charges.
    </p>
    <p>
      We do not collect sales or use taxes in all states. For states imposing
      sales or use tax, your purchase may be subject to use tax unless it is
      specifically exempt from taxation. Your purchase is not exempt merely
      because it is made over the internet or by other remote means. Many states
      require purchasers to file a sales/use tax return at the end of the year
      reporting all of the taxable purchases that were not taxed and to pay tax
      on those purchases. You may have a tax obligation in states where we do
      not collect sales tax. Details of how to report and remit these taxes may
      be found at the websites of your respective tax authorities.
    </p>
    <p>
      In order to be exempt from sales tax in in the aforementioned states, you
      must submit a valid reseller certificate to customer
      service(websupport@accuride.com). Upon validating your certificate, we
      will notify you and flag your account for exemption on future purchases.
      At the beginning of each calendar year your account will automatically
      revert back to a non-exempt status in our system. Following the
      aforementioned certificate submission process, you must provide an updated
      reseller certificate in order to be exempt from sales tax on purchases.
    </p>
    <h4>Canada Tax</h4>
    <p>
      We do not charge for tax on Canada purchases. The customer may be subject
      to GST/HST or other Canadian taxes, if applicable.
    </p>
    <h4>Shipping</h4>
    <p>
      We will ship your order within one business day from when the order is
      placed.
    </p>
    <p>
      Orders placed before 12pm Pacific Time are processed and shipped by end of
      business day. Orders placed after 12pm Pacific Time are processed by end
      of next business day.
    </p>
    <p>
      For orders placed during the weekend/federal holidays, order processing
      will occur on the next business day by end of day. We offer a range of
      delivery options via FedEx. Customer will be responsible for shipping
      costs.
    </p>
    <h4>International Shipping</h4>
    <p>We currently ship to Canada and the US only.</p>
    <p>
      Upon receipt of the shipment, please inspect the items to ensure
      everything is received as expected (quantity, length, model).
    </p>
    <h4>Returns</h4>
    <p>Damaged items, Wrong items, Malfunctioning items:</p>
    <p>
      In the event there is an issue with your order, please fill out our
      contact form HERE immediately to begin the return authorization process.
      Failure to complete the return authorization within 30 days of receipt of
      your purchase will prevent us from granting a return authorization. Once
      your request is received, you may be asked to provide photos of the
      product/original packaging in question. Upon approval of your return, you
      will be provided return shipping labels. Once product is received in our
      facility, inspected and approved, we will process your refund.
    </p>
    <p>Order placement error:</p>
    <p>
      In the event you need to return an order or items due to a change in your
      needs, please fill out our contact form
      <I18nLink href="/contact" isMagentoRoute={1}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="link"
          className="text-primary"
        >
          {" "}
          HERE{" "}
        </a>
      </I18nLink>
      immediately to begin the return authorization process. Failure to complete
      the return authorization within 30 days of receipt of your purchase will
      prevent us from granting a return authorization. You will be charged a
      restocking fee of 25% or a minimum of $10.00. Upon acknowledgement and
      acceptance of your restock fee, you will be provided return shipping
      labels. Once product is received in our facility, inspected and approved,
      we will process your refund and deduct the applicable fee.
    </p>
  </>
);

export default TermsAndConditions;
