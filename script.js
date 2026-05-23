document.addEventListener('DOMContentLoaded', () => {
  initSkillBars();
  initScrollAnimations();
  initCharts();
});

function initSkillBars() {
  const items = document.querySelectorAll('.skill-item[data-level]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = entry.target.dataset.level;
          entry.target.style.setProperty('--level', `${level}%`);
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  items.forEach((item) => observer.observe(item));
}

function initScrollAnimations() {
  const sections = document.querySelectorAll('.content-section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

function initCharts() {
  if (typeof Chart === 'undefined') return;

  Chart.defaults.font.family = "'Montserrat', sans-serif";
  Chart.defaults.color = '#555';

  createRadarChart();
  createDoughnutChart();
  createAreasChart();
}

function createRadarChart() {
  const ctx = document.getElementById('radarChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        'Contabilidade',
        'Tributário',
        'Auditoria',
        'Controladoria',
        'Análise de Dados',
        'Gestão de Equipe'
      ],
      datasets: [{
        label: 'Nível',
        data: [95, 85, 72, 80, 75, 78],
        backgroundColor: 'rgba(44, 46, 53, 0.15)',
        borderColor: '#2c2e35',
        borderWidth: 2,
        pointBackgroundColor: '#2c2e35',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { stepSize: 25, display: false },
          grid: { color: 'rgba(0,0,0,0.08)' },
          angleLines: { color: 'rgba(0,0,0,0.08)' },
          pointLabels: {
            font: { size: 10, weight: '500' }
          }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function createDoughnutChart() {
  const ctx = document.getElementById('doughnutChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Fechamento Contábil',
        'Obrigações Fiscais',
        'Conciliações',
        'Relatórios Gerenciais',
        'Auditoria'
      ],
      datasets: [{
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          '#2c2e35',
          '#4a4d56',
          '#686b75',
          '#868990',
          '#a4a7ae'
        ],
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 10,
            padding: 10,
            font: { size: 10 }
          }
        }
      }
    }
  });
}

function createAreasChart() {
  const ctx = document.getElementById('areasChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Fiscal', 'Gerencial', 'Financeiro', 'Auditoria'],
      datasets: [{
        data: [90, 85, 78, 65],
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 3,
        barThickness: 14
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          display: false,
          grid: { display: false }
        },
        y: {
          grid: { display: false },
          ticks: {
            color: '#a0a4ad',
            font: { size: 11, weight: '400' }
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.raw}%`
          }
        }
      },
      animation: {
        duration: 1200,
        easing: 'easeOutQuart'
      }
    }
  });
}
