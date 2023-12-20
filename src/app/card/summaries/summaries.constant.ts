const servicesData: { [key: string]: { color: string; icon: string } } = {
  'Administration & Communication': {
    color: 'brown',
    icon: 'fa-solid fa-folder-open',
  },
  'Analyse & Research': {
    color: 'pink',
    icon: 'fa-solid fa-flask-vial',
  },
  Bugfixing: {
    color: 'red',
    icon: 'fa-solid fa-bug',
  },
  'Business Development': {
    color: 'yellow',
    icon: 'fa-solid fa-briefcase',
  },
  'Code Review': {
    color: 'green',
    icon: 'fa-solid fa-stethoscope',
  },
  'Conceptual Work': {
    color: 'darkgreen',
    icon: 'fa-solid fa-sitemap',
  },
  Deployment: {
    color: 'teal',
    icon: 'fa-solid fa-paper-plane',
  },
  'Design Work': {
    color: 'orange',
    icon: 'fa-solid fa-compass-drafting',
  },
  Development: {
    color: 'purple',
    icon: 'fa-solid fa-code',
  },
  Documentation: {
    color: 'bluegray',
    icon: 'fa-solid fa-book',
  },
  Finance: {
    color: 'blue',
    icon: 'fa-solid fa-sack-dollar',
  },
  Infrastructure: {
    color: 'rose',
    icon: 'fa-solid fa-folder-tree',
  },
  Meeting: {
    color: 'cyan',
    icon: 'fa-solid fa-comments',
  },
  Projectmanagement: {
    color: 'gray',
    icon: 'fa-solid fa-list-check',
  },
  Recruitment: {
    color: 'blue2',
    icon: 'fa-solid fa-bullhorn',
  },
  Testing: {
    color: 'darkpurple',
    icon: 'fa-solid fa-spell-check',
  },
};

const getOrCreateTooltip = (chart: any) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context: any) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b: any) => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach((title: any) => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = '0';

      const th = document.createElement('th');
      th.style.borderWidth = '0';
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body: any, i: any) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = '2px';
      span.style.marginRight = '10px';
      span.style.height = '10px';
      span.style.width = '10px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = '0';

      const td = document.createElement('td');
      td.style.borderWidth = '0';

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

export { servicesData, externalTooltipHandler };
