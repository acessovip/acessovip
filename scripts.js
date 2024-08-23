document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const isActive = answer.style.display === 'block';

            // Hide all answers and remove active class from all questions
            document.querySelectorAll('.faq-answer').forEach(answer => {
                answer.style.display = 'none';
            });
            document.querySelectorAll('.faq-question').forEach(question => {
                question.classList.remove('active');
            });

            // Toggle the current answer
            if (!isActive) {
                answer.style.display = 'block';
                question.classList.add('active');
            }
        });
    });
});

function updatePrices(courtesyCount) {
    const initialValue = courtesyCount < 100 ? courtesyCount : (Math.floor((courtesyCount - 100) / 500) * 400 + 100);
    document.getElementById('slider-value').textContent = initialValue;
    document.getElementById('free-courtesy').textContent = initialValue;
    document.getElementById('monthly-courtesy').textContent = initialValue;
    document.getElementById('quarterly-courtesy').textContent = initialValue;
    document.getElementById('annual-courtesy').textContent = initialValue;

    const baseMonthlyPrice = 15;
    const baseQuarterlyPrice = 40;
    const baseAnnualPrice = 150;

    document.getElementById('monthly-price').textContent = (baseMonthlyPrice * initialValue / 500).toFixed(2);
    document.getElementById('quarterly-price').textContent = (baseQuarterlyPrice * initialValue / 500).toFixed(2);
    document.getElementById('annual-price').textContent = (baseAnnualPrice * initialValue / 500).toFixed(2);

    // Esconder o plano gratuito após 100 cortesias
    const freePlan = document.querySelector('.plan:nth-child(1)');
    if (initialValue > 100) {
        freePlan.style.display = 'none';
    } else {
        freePlan.style.display = 'block';
    }

    // Alterar os botões dos outros planos para "Compre Agora!" após 100 cortesias
    const planButtons = document.querySelectorAll('.plan button');
    planButtons.forEach((button, index) => {
        if (index > 0) { // Ignorar o botão do plano gratuito
            if (initialValue > 100) {
                button.textContent = 'Compre Agora!';
            } else {
                button.textContent = 'Experimente grátis';
            }
        }
    });
}
