const revealItems = document.querySelectorAll('.reveal');
const onReveal = () => {
  revealItems.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) el.classList.add('show');
  });
};
window.addEventListener('scroll', onReveal);
onReveal();

const counters = document.querySelectorAll('.counter');
counters.forEach((counter) => {
  const target = Number(counter.dataset.target || 0);
  let value = 0;
  const tick = () => {
    value += Math.ceil((target - value) / 10);
    counter.textContent = String(value);
    if (value < target) requestAnimationFrame(tick);
  };
  tick();
});

const testimonials = [
  ['"خفضنا تكاليف الشحن 22% خلال أول شهر."', 'متجر أناقة - الرياض'],
  ['"أصبحت إدارة COD أسهل بكثير والتسويات واضحة بالكامل."', 'متجر بيتك - جدة'],
  ['"مقارنة الأسعار لحظياً رفعت هامش الربح بشكل ملحوظ."', 'متجر Moda - الدمام']
];
let t = 0;
const quote = document.getElementById('quote');
const author = document.getElementById('author');
if (quote && author) {
  setInterval(() => {
    t = (t + 1) % testimonials.length;
    quote.textContent = testimonials[t][0];
    author.textContent = testimonials[t][1];
  }, 3500);
}

const links = document.querySelectorAll('.side-link');
const panels = document.querySelectorAll('.panel');
links.forEach((btn) => {
  btn.addEventListener('click', () => {
    links.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    panels.forEach((p) => p.classList.remove('active'));
    document.getElementById(btn.dataset.target)?.classList.add('active');
  });
});

const orders = [
  ['SALLA-12345', 'salla', 'أحمد محمد العلي', 'الرياض', '450 ر.س', '450 ر.س', 'قيد الانتظار'],
  ['ZID-67890', 'zid', 'فاطمة سعيد الغامدي', 'جدة', '280 ر.س', '280 ر.س', 'قيد المعالجة'],
  ['SHOPIFY-54321', 'shopify', 'خالد عبدالله القحطاني', 'الرياض', '620 ر.س', '-', 'تم الشحن'],
  ['WOO-98765', 'woocommerce', 'نورة حسن الدوسري', 'الدمام', '195 ر.س', '195 ر.س', 'تم التسليم']
];
const ordersBody = document.getElementById('ordersBody');
if (ordersBody) {
  ordersBody.innerHTML = orders
    .map(
      (o) =>
        `<tr><td>${o[0]}</td><td>${o[1]}</td><td>${o[2]}</td><td>${o[3]}</td><td>${o[4]}</td><td>${o[5]}</td><td><span class="chip ${o[6].includes('تم التسليم') ? 'green' : o[6].includes('الشحن') ? 'blue' : 'yellow'}">${o[6]}</span></td></tr>`
    )
    .join('');
}

const compareBtn = document.getElementById('compareBtn');
if (compareBtn) {
  compareBtn.addEventListener('click', () => {
    const weight = Number(document.getElementById('weight')?.value || 1);
    const destination = document.getElementById('destination')?.value || 'الرياض';
    const quotes = [
      { carrier: 'J&T', base: 9, perKg: 3.9, eta: '1-3 أيام', rating: 4.4 },
      { carrier: 'SMSA', base: 10, perKg: 4.2, eta: '1-7 أيام', rating: 4.5 },
      { carrier: 'Aramex', base: 12, perKg: 4.5, eta: '1-5 أيام', rating: 4.6 },
      { carrier: 'DHL', base: 18, perKg: 6.2, eta: '1-4 أيام', rating: 4.8 }
    ].map((q) => ({ ...q, total: (q.base + q.perKg * weight).toFixed(2) }))
      .sort((a, b) => Number(a.total) - Number(b.total));

    const box = document.getElementById('quoteResults');
    if (!box) return;
    box.innerHTML = `<h3>أفضل الخيارات إلى ${destination}</h3>` + quotes.map((q, i) =>
      `<div class="quote"><b>${q.carrier}</b> - ${q.total} ر.س | ${q.eta} | تقييم ${q.rating} ${i === 0 ? '⭐ الأرخص' : ''}</div>`
    ).join('');
  });
}
