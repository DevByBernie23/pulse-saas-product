
import React from 'react';
import './Billing.css';
import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { z } from 'zod';

const Billing = () => {
  const [billingHistory, setBillingHistory] = useState([]);
  const [plans, setPlans] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [managePlansModal, setShowManagePlansModal] = useState(false);
  const [editPaymentMethodModal, setEditPaymentMethodModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [addPaymentModal, setAddPaymentModal] = useState(false);
  const [formErrors, setFormErrors] = useState(null);
  const [saving, setSaving] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    const getBillingHistory = async () => {
      try {
        setLoading(true);

        const [billingResponse, planResponse, paymentResponse] =
          await Promise.all([
            fetch('http://localhost:3000/billingHistory'),
            fetch('http://localhost:3000/plans'),
            fetch('http://localhost:3000/paymentMethods'),
          ]);

        if (!billingResponse.ok) {
          throw new Error('Failed to fetch billing history');
        }

        if (!planResponse.ok) {
          throw new Error('Failed to fetch plans');
        }

        if (!paymentResponse.ok) {
          throw new Error('Fetching payment unsuccessful!');
        }

        const [billingData, planData, paymentMethodData] =
          await Promise.all([
            billingResponse.json(),
            planResponse.json(),
            paymentResponse.json(),
          ]);

        setBillingHistory(billingData);
        setPlans(planData);
        setPaymentMethod(
          paymentMethodData[paymentMethodData.length - 1]
        );

        setError(null);
        setShowManagePlansModal(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getBillingHistory();
  }, []);

  if (loading) {
    return (
      <div className="billing-state billing-loading">
        <h2 className="billing-state-title">Loading billing data</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="billing-state billing-error">
        <h2 className="billing-state-title">{error.message}</h2>
      </div>
    );
  }

  const paymentValidation = z.object({
    cardnumber: z.string().min(1, 'card number is required'),
    cardcvv: z.string().min(1, 'CVV is required'),
    expirydate: z.string().min(1, 'fill in expiry date'),
  });

  const AddPayment = async () => {
    const result = paymentValidation.safeParse({
      cardnumber: cardNumber.trim(),
      cardcvv: cardCvv.trim(),
      expirydate: expiryDate.trim(),
    });

    if (!result.success) {
      const errors = {};

      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });

      setFormErrors(errors);
      return;
    }
    try {
    setFormErrors({});
    setSaving(true);

    const [year, month] = expiryDate.split('-');

    const updatedPaymentMethod = {
      ...paymentMethod,
      type: cardNumber.startsWith('4') ? 'Visa' : 'Card',
      last4: cardNumber.slice(-4),
      expiryMonth: month,
      expiryYear: year.slice(-2),
      isDefault: true,
      status: 'active',
    };

    
      const response = await fetch(
        'http://localhost:3000/paymentMethods',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPaymentMethod),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add payment method');
      }

      const savedPaymentMethod = await response.json();

      setPaymentMethod(savedPaymentMethod);
      setCardNumber('');
      setCardCvv('');
      setExpiryDate('');
      setEditPaymentMethodModal(false);
      setAddPaymentModal(false)

      console.log('Saved payment method:', savedPaymentMethod);
    }  catch (error) {
    setFormErrors({
      payment: error.message,
    });
  } finally {
    setSaving(false);
  }
  };

  const exportInvoice = (selectedInvoice) => {
    const headers = [
      'InvoiceNumber',
      'BillingDate',
      'PaymentStatus',
      'CustomerName',
      'BillingEmail',
      'SubscriptionPlan',
      'BillingPeriod',
      'AmountBeforeTax',
      'Tax',
      'Discount',
      'TotalAmountPaid',
      'PaymentMethod',
      'TransactionReference',
    ];

    const rows = [
      [
        selectedInvoice.invoiceNumber,
        selectedInvoice.billingDate,
        selectedInvoice.paymentStatus,
        selectedInvoice.customerName,
        selectedInvoice.billingEmail,
        selectedInvoice.subscriptionPlan,
        selectedInvoice.billingPeriod,
        selectedInvoice.amountBeforeTax,
        selectedInvoice.tax,
        selectedInvoice.discount,
        selectedInvoice.totalAmountPaid,
        selectedInvoice.paymentMethod,
        selectedInvoice.transactionReference,
      ],
    ];

    const csvContent = [headers, ...rows]
      .map((row) => row.join(','))
      .join('\n');

    console.log(csvContent);

    const blob = new Blob([csvContent], {
      type: 'text/csv',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `Invoice-${new Date()
      .toISOString()
      .split('T')[0]}.csv`;

    link.click();

    URL.revokeObjectURL(url);
  };

  const printInvoice = (selectedInvoice) => {
    const printWindow = window.open('', '_blank');

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${selectedInvoice.invoiceNumber}</title>

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #222;
            }

            .invoice {
              max-width: 800px;
              margin: 0 auto;
            }

            .header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 40px;
            }

            h1 {
              margin-bottom: 5px;
            }

            .section {
              margin-bottom: 30px;
            }

            .row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
            }

            .total {
              border-top: 2px solid #222;
              padding-top: 12px;
              font-size: 18px;
              font-weight: bold;
            }

            .footer {
              margin-top: 50px;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>

        <body>
          <div class="invoice">

            <div class="header">
              <div class="invoice-title-block">
                <h1>Invoice</h1>
                <p class="invoice-number">
                  ${selectedInvoice.invoiceNumber}
                </p>
              </div>

              <div class="invoice-date-block">
                <strong>Billing Date</strong>
                <p>${selectedInvoice.billingDate}</p>
              </div>
            </div>

            <div class="section customer-section">
              <h2>Customer Information</h2>

              <p>
                <strong>Business Name:</strong>
                ${selectedInvoice.customerName}
              </p>

              <p>
                <strong>Billing Email:</strong>
                ${selectedInvoice.billingEmail}
              </p>
            </div>

            <div class="section subscription-section">
              <h2>Subscription</h2>

              <p>
                <strong>Plan:</strong>
                ${selectedInvoice.subscriptionPlan}
              </p>

              <p>
                <strong>Billing Period:</strong>
                ${selectedInvoice.billingPeriod.start}
                –
                ${selectedInvoice.billingPeriod.end}
              </p>
            </div>

            <div class="section payment-summary-section">
              <h2>Payment Summary</h2>

              <div class="row">
                <span>Amount Before Tax</span>
                <span>
                  ${selectedInvoice.currency}
                  ${selectedInvoice.amountBeforeTax.toFixed(2)}
                </span>
              </div>

              <div class="row">
                <span>Tax</span>
                <span>
                  ${selectedInvoice.currency}
                  ${selectedInvoice.tax.toFixed(2)}
                </span>
              </div>

              <div class="row">
                <span>Discount</span>
                <span>
                  ${selectedInvoice.currency}
                  ${selectedInvoice.discount.toFixed(2)}
                </span>
              </div>

              <div class="row total">
                <span>Total Amount Paid</span>
                <span>
                  ${selectedInvoice.currency}
                  ${selectedInvoice.totalAmountPaid.toFixed(2)}
                </span>
              </div>
            </div>

            <div class="section payment-details-section">
              <h2>Payment Details</h2>

              <p>
                <strong>Payment Method:</strong>
                ${selectedInvoice.paymentMethod.type}
                ending in
                ${selectedInvoice.paymentMethod.last4}
              </p>

              <p>
                <strong>Transaction Reference:</strong>
                ${selectedInvoice.transactionReference}
              </p>
            </div>

            <div class="footer">
              <p>Thank you for your business.</p>
            </div>

          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="billing-page">
      <div className="app">

        <Header className="header" />

        <Nav className="nav" />

        <main className="hero billing-main">

          {/* ==================== INTRO ==================== */}

          <section className="billing-intro">
            <div className="billing-intro-content">
              <h1 className="billing-title">Billing</h1>

              <p className="billing-description">
                Manage your subscription and billing information.
              </p>
            </div>
          </section>


          {/* ==================== CURRENT PLAN ==================== */}

          <section className="current-plan">

            <div className="plan-header">

              <div className="plan-info">
                <span className="section-label">
                  Current Plan
                </span>

                <h2 className="plan-name">
                  Professional
                </h2>

                <p className="plan-description">
                  Everything you need to manage your growing business.
                </p>
              </div>

              <div className="plan-price">
                <strong className="plan-price-amount">$49</strong>
                <span className="plan-price-period">/ month</span>
              </div>

            </div>

            <div className="plan-features">

              <span className="plan-feature">
                ✓ Unlimited projects
              </span>

              <span className="plan-feature">
                ✓ Advanced analytics
              </span>

              <span className="plan-feature">
                ✓ Team collaboration
              </span>

              <span className="plan-feature">
                ✓ Priority support
              </span>

            </div>

            <div className="plan-actions">
              <button
                className="manage-plan-btn"
                onClick={() => setShowManagePlansModal(true)}
              >
                Manage Plan
              </button>

              <button className="cancel-subscription-btn">
                Cancel subscription
              </button>
            </div>

          </section>


          {/* ==================== MANAGE PLANS MODAL ==================== */}

          {managePlansModal && (
            <section className="manage-plans-modal">

              <div className="manage-plans-modal-content">

                <div className="modal-header">
                  <div className="modal-heading">
                    <h2 className="modal-title">
                      Manage Plans
                    </h2>

                    <p className="modal-description">
                      Choose the plan that works best for your business.
                    </p>
                  </div>

                  <button
                    className="modal-close-btn"
                    onClick={() => setShowManagePlansModal(false)}
                  >
                    X
                  </button>
                </div>


                <div className="plans-list">

                  {plans.map((plan) => (
                    <div
                      className="plan-option"
                      key={plan.id}
                    >

                      <div className="plan-option-header">
                        <h3 className="plan-option-name">
                          {plan.name}
                        </h3>

                        {plan.popular && (
                          <span className="plan-popular-badge">
                            Popular
                          </span>
                        )}
                      </div>

                      <p className="plan-option-description">
                        {plan.description}
                      </p>

                      <div className="plan-option-price">
                        <span className="plan-option-price-amount">
                          ${plan.price.toFixed(2)}
                        </span>

                        <span className="plan-option-currency">
                          {plan.currency}
                        </span>
                      </div>

                      <div className="plan-option-features">

                        {plan.features.map((feature, index) => (
                          <p
                            className="plan-option-feature"
                            key={index}
                          >
                            ✓ {feature}
                          </p>
                        ))}

                      </div>

                      <button className="switch-plan-btn">
                        Switch to this plan
                      </button>

                    </div>
                  ))}

                </div>

              </div>

            </section>
          )}


          {/* ==================== PAYMENT METHOD ==================== */}

          <section className="billing-card payment-method-card">

            <div className="card-heading">

              <div className="card-heading-content">
                <h2 className="card-title">
                  Payment Method
                </h2>

                <p className="card-description">
                  Your default payment method.
                </p>
              </div>

              <button
                className="edit-payment-btn"
                onClick={() => setEditPaymentMethodModal(true)}
              >
                Edit
              </button>

            </div>


            <div className="payment-method">

              <div className="card-icon">
                💳
              </div>

              <div className="payment-method-info">
                <strong className="payment-method-name">
                  {paymentMethod.type} ending in {paymentMethod.last4}
                </strong>

                <span className="payment-method-expiry">
                  Expires {paymentMethod.expiryMonth}/
                  {paymentMethod.expiryYear}
                </span>
              </div>

            </div>

          </section>


          {/* ==================== PAYMENT METHODS MODAL ==================== */}

          {editPaymentMethodModal && (
            <div className="payment-modal">

              <div className="payment-modal-content">

                <div className="modal-header">
                  <div className="modal-heading">
                    <h3 className="modal-title">
                      Payment Methods
                    </h3>

                    <p className="modal-description">
                      Manage your payment methods.
                    </p>
                  </div>

                  <button
                    className="modal-close-btn"
                    onClick={() => setEditPaymentMethodModal(false)}
                  >
                    X
                  </button>
                </div>


                <div className="current-payment-section">

                  <h4 className="modal-section-title">
                    Current payment method
                  </h4>

                  <div className="payment-method-card-item">

                    <div className="payment-method-card-header">

                      <div className="card-icon">
                        💳
                      </div>

                      <div className="payment-card-brand">
                        <p className="payment-card-type">
                          {paymentMethod.type}
                        </p>

                        <p className="payment-card-number">
                          ****{paymentMethod.last4}
                        </p>
                      </div>

                    </div>

                    <p className="payment-card-expiry">
                      Expires: {paymentMethod.expiryMonth}/
                      {paymentMethod.expiryYear}
                    </p>

                    <p className="payment-card-default">
                      {paymentMethod.isDefault
                        ? 'Default'
                        : 'Set as Default'}
                    </p>

                    <button className="remove-payment-btn">
                      Remove
                    </button>

                  </div>

                </div>


                <div className="payment-modal-actions">

                  <button
                    className="add-payment-btn"
                    onClick={() => setAddPaymentModal(true)}
                  >
                    Add Payment Method
                  </button>

                </div>


                <hr className="payment-modal-divider" />

                <p className="payment-security-message">
                  Payment information is securely handled by our
                  payment provider.
                </p>

                <button
                  className="close-payment-modal-btn"
                  onClick={() => setEditPaymentMethodModal(false)}
                >
                  Close
                </button>

              </div>

            </div>
          )}


          {/* ==================== ADD PAYMENT MODAL ==================== */}

          {addPaymentModal && (
            <div className="add-payment-modal">

              <div className="add-payment-modal-content">

                <div className="modal-header">

                  <div className="modal-heading">
                    <h3 className="modal-title">
                      Add Payment Method
                    </h3>

                    <p className="modal-description">
                      Add a new card to your account.
                    </p>
                  </div>

                  <button
                    className="modal-close-btn"
                    onClick={() => setAddPaymentModal(false)}
                  >
                    X
                  </button>

                </div>


                <div className="payment-form">

                  {/* Card Number */}

                  <div className="form-field">

                    <label
                      className="form-label"
                      htmlFor="card-number"
                    >
                      Card number
                    </label>

                    <input
                      id="card-number"
                      className={`form-input ${
                        formErrors?.cardnumber
                          ? 'form-input-error'
                          : ''
                      }`}
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) => {
                        setCardNumber(e.target.value);

                        setFormErrors((currentErrors) => ({
                          ...currentErrors,
                          cardnumber: '',
                        }));
                      }}
                    />

                    {formErrors?.cardnumber && (
                      <span className="form-error">
                        {formErrors.cardnumber}
                      </span>
                    )}

                  </div>


                  <div className="form-row">

                    {/* Expiry */}

                    <div className="form-field form-field-expiry">

                      <label
                        className="form-label"
                        htmlFor="expiry-date"
                      >
                        Expiry
                      </label>

                      <input
                        id="expiry-date"
                        className={`form-input ${
                          formErrors?.expirydate
                            ? 'form-input-error'
                            : ''
                        }`}
                        type="month"
                        value={expiryDate}
                        onChange={(e) => {
                          setExpiryDate(e.target.value);

                          setFormErrors((currentErrors) => ({
                            ...currentErrors,
                            expirydate: '',
                          }));
                        }}
                      />

                      {formErrors?.expirydate && (
                        <span className="form-error">
                          {formErrors.expiryDate}
                        </span>
                      )}

                    </div>


                    {/* CVV */}

                    <div className="form-field form-field-cvv">

                      <label
                        className="form-label"
                        htmlFor="card-cvv"
                      >
                        CVV
                      </label>

                      <input
                        id="card-cvv"
                        className={`form-input ${
                          formErrors?.cardcvv
                            ? 'form-input-error'
                            : ''
                        }`}
                        type="password"
                        inputMode="numeric"
                        value={cardCvv}
                        onChange={(e) => {
                          setCardCvv(e.target.value);

                          setFormErrors((currentErrors) => ({
                            ...currentErrors,
                            cardcvv: '',
                          }));
                        }}
                      />

                      {formErrors?.cardcvv && (
                        <span className="form-error">
                          {formErrors.cardcvv}
                        </span>
                      )}

                    </div>

                  </div>


                  <div className="form-actions">

                    <button
                      className="form-cancel-btn"
                      onClick={() => setAddPaymentModal(false)}
                    >
                      Cancel
                    </button>
                   {formErrors?.payment && (
  <p className="form-error">
    {formErrors.payment}
  </p>
)}
                    <button
                      onClick={AddPayment} disabled={saving}>
  {saving ? 'Adding...' : 'Add Card'}
                    </button>

                  </div>

                </div>

              </div>

            </div>
          )}


          {/* ==================== BILLING HISTORY ==================== */}

          <section className="billing-card billing-history-card">

            <div className="card-heading">

              <div className="card-heading-content">

                <h2 className="card-title">
                  Billing History
                </h2>

                <p className="card-description">
                  View your previous invoices and payments.
                </p>

              </div>

            </div>


            <div className="billing-table-container">

              <table className="billing-table">

                <thead className="billing-table-head">

                  <tr className="billing-table-row">

                    <th className="billing-table-header">
                      Invoice
                    </th>

                    <th className="billing-table-header">
                      Date
                    </th>

                    <th className="billing-table-header">
                      Amount
                    </th>

                    <th className="billing-table-header">
                      Status
                    </th>

                    <th className="billing-table-header">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody className="billing-table-body">

                  {billingHistory.map((invoice) => (

                    <tr
                      className="billing-table-row"
                      key={invoice.id}
                    >

                      <td className="billing-table-cell invoice-cell">
                        <strong className="invoice-number">
                          {invoice.invoiceNumber}
                        </strong>
                      </td>

                      <td className="billing-table-cell">
                        {invoice.billingDate}
                      </td>

                      <td className="billing-table-cell invoice-amount">
                        ${invoice.totalAmountPaid.toFixed(2)}
                      </td>

                      <td className="billing-table-cell">

                        <span className="invoice-status">
                          {invoice.paymentStatus}
                        </span>

                      </td>

                      <td className="billing-table-cell">

                        <button
                          className="invoice-btn"
                          onClick={() =>
                            setSelectedInvoice(invoice)
                          }
                        >
                          View
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>


          {/* ==================== INVOICE DETAILS ==================== */}

          {selectedInvoice && (

            <section className="invoice-details">

              <div className="invoice-details-header">

                <div className="invoice-details-heading">

                  <span className="invoice-details-label">
                    Invoice
                  </span>

                  <h2 className="invoice-details-title">
                    Invoice Details
                  </h2>

                </div>

                <button
                  className="invoice-close-btn"
                  onClick={() => setSelectedInvoice(null)}
                >
                  Close
                </button>

              </div>


              {/* Invoice Header */}

              <div className="invoice-header">

                <div className="invoice-header-item">

                  <span className="invoice-header-label">
                    Invoice Number
                  </span>

                  <strong className="invoice-header-value">
                    {selectedInvoice.invoiceNumber}
                  </strong>

                </div>


                <div className="invoice-header-item">

                  <span className="invoice-header-label">
                    Billing Date
                  </span>

                  <strong className="invoice-header-value">
                    {selectedInvoice.billingDate}
                  </strong>

                </div>


                <div className="invoice-header-item">

                  <span className="invoice-header-label">
                    Payment Status
                  </span>

                  <strong className="invoice-header-value">
                    {selectedInvoice.paymentStatus}
                  </strong>

                </div>

              </div>


              {/* Customer Details */}

              <div className="customer-details invoice-section">

                <h3 className="invoice-section-title">
                  Customer Information
                </h3>

                <p className="invoice-detail-row">
                  <strong className="invoice-detail-label">
                    Business Name:
                  </strong>

                  <span className="invoice-detail-value">
                    {selectedInvoice.customerName}
                  </span>
                </p>

                <p className="invoice-detail-row">

                  <strong className="invoice-detail-label">
                    Billing Email:
                  </strong>

                  <span className="invoice-detail-value">
                    {selectedInvoice.billingEmail}
                  </span>

                </p>

              </div>


              {/* Subscription Details */}

              <div className="subscription-details invoice-section">

                <h3 className="invoice-section-title">
                  Subscription
                </h3>

                <p className="invoice-detail-row">

                  <strong className="invoice-detail-label">
                    Plan:
                  </strong>

                  <span className="invoice-detail-value">
                    {selectedInvoice.subscriptionPlan}
                  </span>

                </p>

                <p className="invoice-detail-row">

                  <strong className="invoice-detail-label">
                    Billing Period:
                  </strong>

                  <span className="invoice-detail-value">
                    {selectedInvoice.billingPeriod.start}
                    {' – '}
                    {selectedInvoice.billingPeriod.end}
                  </span>

                </p>

              </div>


              {/* Payment Summary */}

              <div className="payment-summary invoice-section">

                <h3 className="invoice-section-title">
                  Payment Summary
                </h3>

                <p className="payment-summary-row">

                  <span className="payment-summary-label">
                    Amount Before Tax
                  </span>

                  <strong className="payment-summary-value">
                    {selectedInvoice.currency}{' '}
                    {selectedInvoice.amountBeforeTax.toFixed(2)}
                  </strong>

                </p>


                <p className="payment-summary-row">

                  <span className="payment-summary-label">
                    Tax
                  </span>

                  <strong className="payment-summary-value">
                    {selectedInvoice.currency}{' '}
                    {selectedInvoice.tax.toFixed(2)}
                  </strong>

                </p>


                <p className="payment-summary-row">

                  <span className="payment-summary-label">
                    Discount
                  </span>

                  <strong className="payment-summary-value">
                    {selectedInvoice.currency}{' '}
                    {selectedInvoice.discount.toFixed(2)}
                  </strong>

                </p>


                <p className="payment-summary-row invoice-total">

                  <span className="payment-summary-label">
                    Total Amount Paid
                  </span>

                  <strong className="payment-summary-value">
                    {selectedInvoice.currency}{' '}
                    {selectedInvoice.totalAmountPaid.toFixed(2)}
                  </strong>

                </p>

              </div>


              {/* Payment Details */}

              <div className="payment-details invoice-section">

                <h3 className="invoice-section-title">
                  Payment Details
                </h3>

                <p className="invoice-detail-row">

                  <strong className="invoice-detail-label">
                    Payment Method:
                  </strong>

                  <span className="invoice-detail-value">
                    {selectedInvoice.paymentMethod.type}
                    {' '}ending in{' '}
                    {selectedInvoice.paymentMethod.last4}
                  </span>

                </p>


                <p className="invoice-detail-row">

                  <strong className="invoice-detail-label">
                    Transaction Reference:
                  </strong>

                  <span className="invoice-detail-value">
                    {selectedInvoice.transactionReference}
                  </span>

                </p>

              </div>


              {/* Invoice Actions */}

              <div className="invoice-actions">

                <button
                  className="invoice-action-btn invoice-download-btn"
                  onClick={() => exportInvoice(selectedInvoice)}
                >
                  Download
                </button>

                <button
                  className="invoice-action-btn invoice-print-btn"
                  onClick={() => printInvoice(selectedInvoice)}
                >
                  Print
                </button>

              </div>

            </section>

          )}

        </main>

      </div>
    </div>
  );
};

export default Billing;

