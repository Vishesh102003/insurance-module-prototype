const screenMeta = {
  dashboard: {
    title: 'Insurance Work Queue',
    subtitle:
      'Role-wise operational view for registration, insurance desk, billing, and finance.',
  },
  patient: {
    title: 'Patient Insurance Registration',
    subtitle:
      'Capture policies, priority, consent, documents, and verification status before billing.',
  },
  master: {
    title: 'Insurance Master and Contract Rules',
    subtitle:
      'Configure payer type, TPA, SLA, pricing group, coverage defaults, and integration mode.',
  },
  verification: {
    title: 'Eligibility and Manual Verification',
    subtitle:
      'Use a structured verification model for API, portal, phone, email, and batch modes.',
  },
  preauth: {
    title: 'Pre-Authorization Workflow',
    subtitle:
      'Track request, query, approval, amendment, utilization, and final authorization.',
  },
  billing: {
    title: 'Rule-Based Split Billing',
    subtitle:
      'Preview insurer and patient liability at bill-line level before finalization.',
  },
  claims: {
    title: 'Claim Packet and Lifecycle',
    subtitle:
      'Build a complete claim packet and track submission, query, settlement, and appeal.',
  },
  pricing: {
    title: 'Bulk Pricing Upload',
    subtitle:
      'Dry-run validation, variance review, approval, versioning, activation, and rollback.',
  },
  audit: {
    title: 'Audit, Reports, and NABH Evidence',
    subtitle:
      'Evidence matrix for access control, audit trail, consent, NHCX readiness, and SLA compliance.',
  },
};

const queueItems = [
  {
    id: 'T-1007',
    patient: 'Rakesh Kumar',
    detail: 'UHID M16-245901',
    payer: 'Star Health',
    stage: 'Pre-auth amendment',
    statusClass: 'badge-soft-warning',
    sla: '34 min',
    amount: 'INR 1,85,000',
    owner: 'Insurance Desk',
    bucket: 'sla',
    action: 'Request amendment for amount above approved pre-auth.',
  },
  {
    id: 'T-1011',
    patient: 'Meena Sharma',
    detail: 'UHID M16-245944',
    payer: 'CGHS Jaipur',
    stage: 'Package code missing',
    statusClass: 'badge-soft-danger',
    sla: 'Blocked',
    amount: 'INR 76,000',
    owner: 'Billing',
    bucket: 'billing',
    action: 'Select CGHS package code before claim packet creation.',
  },
  {
    id: 'T-1014',
    patient: 'Amit Bansal',
    detail: 'UHID M16-245966',
    payer: 'ABC Corporate',
    stage: 'Signed form pending',
    statusClass: 'badge-soft-warning',
    sla: '2h 10m',
    amount: 'INR 42,300',
    owner: 'Registration',
    bucket: 'docs',
    action: 'Collect employee declaration and authorization letter.',
  },
  {
    id: 'T-1019',
    patient: 'Kavita Rao',
    detail: 'UHID M16-246002',
    payer: 'MediAssist TPA',
    stage: 'Final auth due',
    statusClass: 'badge-soft-danger',
    sla: '18 min',
    amount: 'INR 2,12,400',
    owner: 'TPA Coordinator',
    bucket: 'sla',
    action: 'Escalate final authorization before discharge delay.',
  },
  {
    id: 'T-1024',
    patient: 'Iqbal Khan',
    detail: 'UHID M16-246019',
    payer: 'Self + Reimbursement',
    stage: 'Claim kit ready',
    statusClass: 'badge-soft-success',
    sla: 'Ready',
    amount: 'INR 18,600',
    owner: 'Billing',
    bucket: 'billing',
    action: 'Print patient reimbursement kit and receipts.',
  },
];

function setScreen(screen) {
  const meta = screenMeta[screen] || screenMeta.dashboard;
  document.querySelectorAll('.screen').forEach((item) => {
    item.classList.toggle('active', item.id === `screen-${screen}`);
  });
  document.querySelectorAll('.nav-link').forEach((item) => {
    item.classList.toggle('active', item.dataset.screen === screen);
  });
  document.getElementById('screenTitle').textContent = meta.title;
  document.getElementById('screenSubtitle').textContent = meta.subtitle;
}

function renderQueue(filter = 'all') {
  const rows = queueItems
    .filter((item) => filter === 'all' || item.bucket === filter)
    .map(
      (item) => `
        <tr>
          <td>
            <strong>${item.patient}</strong>
            <small>${item.detail}</small>
          </td>
          <td>${item.payer}</td>
          <td><span class="badge ${item.statusClass}">${item.stage}</span></td>
          <td>${item.sla}</td>
          <td>${item.amount}</td>
          <td>${item.owner}</td>
          <td><button class="task-link" data-task="${item.id}">Open</button></td>
        </tr>
      `,
    )
    .join('');

  document.getElementById('queueRows').innerHTML =
    rows ||
    `<tr><td colspan="7" class="text-center text-muted">No tasks for this filter.</td></tr>`;
}

function openDrawer(taskId) {
  const task =
    queueItems.find((item) => item.id === taskId) || queueItems[0];
  document.getElementById('drawerTitle').textContent = `${task.patient} - ${task.stage}`;
  document.getElementById('drawerBody').innerHTML = `
    <div class="drawer-section">
      <h4>Task summary</h4>
      <p>${task.action}</p>
      <div class="snapshot">
        <div><span>Task ID</span><strong>${task.id}</strong></div>
        <div><span>Payer</span><strong>${task.payer}</strong></div>
        <div><span>Amount</span><strong>${task.amount}</strong></div>
        <div><span>SLA</span><strong>${task.sla}</strong></div>
        <div><span>Owner</span><strong>${task.owner}</strong></div>
      </div>
    </div>
    <div class="drawer-section">
      <h4>Recommended next step</h4>
      <p>The prototype routes this action to the most relevant workflow screen.</p>
      <div class="drawer-actions">
        <button class="btn btn-light btn-sm" data-screen-link="patient">Patient Policy</button>
        <button class="btn btn-light btn-sm" data-screen-link="verification">Verification</button>
        <button class="btn btn-light btn-sm" data-screen-link="preauth">Pre-Auth</button>
        <button class="btn btn-primary btn-sm" data-screen-link="billing">Billing Split</button>
      </div>
    </div>
    <div class="drawer-section">
      <h4>Audit evidence</h4>
      <p>Opening this task records view access. Every override or document action would require reason and timestamp in the production build.</p>
    </div>
  `;
  document.getElementById('drawerBackdrop').hidden = false;
  document.getElementById('detailDrawer').classList.add('open');
  document.getElementById('detailDrawer').setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  document.getElementById('drawerBackdrop').hidden = true;
  document.getElementById('detailDrawer').classList.remove('open');
  document.getElementById('detailDrawer').setAttribute('aria-hidden', 'true');
}

function applySearch() {
  const value = document.getElementById('globalSearch').value.trim().toLowerCase();
  if (!value) {
    renderQueue(document.querySelector('.segment.active')?.dataset.queueFilter || 'all');
    return;
  }

  const rows = queueItems
    .filter((item) =>
      `${item.patient} ${item.detail} ${item.payer} ${item.stage} ${item.amount}`
        .toLowerCase()
        .includes(value),
    )
    .map(
      (item) => `
        <tr>
          <td>
            <strong>${item.patient}</strong>
            <small>${item.detail}</small>
          </td>
          <td>${item.payer}</td>
          <td><span class="badge ${item.statusClass}">${item.stage}</span></td>
          <td>${item.sla}</td>
          <td>${item.amount}</td>
          <td>${item.owner}</td>
          <td><button class="task-link" data-task="${item.id}">Open</button></td>
        </tr>
      `,
    )
    .join('');

  setScreen('dashboard');
  document.getElementById('queueRows').innerHTML =
    rows ||
    `<tr><td colspan="7" class="text-center text-muted">No results found.</td></tr>`;
}

document.addEventListener('click', (event) => {
  const nav = event.target.closest('[data-screen]');
  if (nav) {
    setScreen(nav.dataset.screen);
    return;
  }

  const link = event.target.closest('[data-screen-link]');
  if (link) {
    closeDrawer();
    setScreen(link.dataset.screenLink);
    return;
  }

  const filter = event.target.closest('[data-queue-filter]');
  if (filter) {
    document.querySelectorAll('[data-queue-filter]').forEach((item) => {
      item.classList.toggle('active', item === filter);
    });
    renderQueue(filter.dataset.queueFilter);
    return;
  }

  const task = event.target.closest('[data-task]');
  if (task) {
    openDrawer(task.dataset.task);
  }
});

document.getElementById('closeDrawer').addEventListener('click', closeDrawer);
document.getElementById('drawerBackdrop').addEventListener('click', closeDrawer);
document.getElementById('globalSearch').addEventListener('input', applySearch);
document.getElementById('openEvidence').addEventListener('click', () => setScreen('audit'));

renderQueue();
