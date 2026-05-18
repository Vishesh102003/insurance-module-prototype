const STORAGE_KEY = 'insurance-module-functional-prototype-v2';

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

const initialState = {
  activeScreen: 'dashboard',
  selectedPolicyId: 'pol-star',
  selectedMasterId: 'master-star',
  activeQueueFilter: 'all',
  policyDocs: {
    'Insurance card': true,
    'Photo ID': true,
    Consent: true,
    'Policy copy': false,
  },
  policies: [
    {
      id: 'pol-star',
      priority: 'Primary',
      provider: 'Star Health Cashless',
      type: 'Cashless',
      policyNumber: 'SH-8821-0091',
      memberId: 'STAR-443210',
      holderType: 'Self',
      validFrom: '2026-04-01',
      validTo: '2027-03-31',
      sumInsured: 500000,
      availableBalance: 386400,
      status: 'Verified',
    },
    {
      id: 'pol-abc',
      priority: 'Secondary',
      provider: 'ABC Corporate',
      type: 'Corporate',
      policyNumber: 'AB-7831',
      memberId: 'ACC-2026-NORTH',
      holderType: 'Employee',
      validFrom: '2026-01-01',
      validTo: '2026-12-31',
      sumInsured: 150000,
      availableBalance: 92500,
      status: 'Manual check',
    },
  ],
  masters: [
    {
      id: 'master-star',
      name: 'Star Health',
      code: 'STAR',
      type: 'Cashless',
      tpa: 'MediAssist',
      pricing: 'STAR-ORTHO-26',
      status: 'Active',
      contract: '01 Apr 2026 - 31 Mar 2027',
      preauthRequired: true,
      preauthSla: 60,
      finalAuthSla: 180,
      icdRequired: true,
      coPay: 10,
      roomCap: 5000,
      integration: 'API + Manual fallback',
    },
    {
      id: 'master-cghs',
      name: 'CGHS Jaipur',
      code: 'CGHS-JPR',
      type: 'Government Scheme',
      tpa: 'Government portal',
      pricing: 'CGHS-PACKAGE-26',
      status: 'Expires in 22d',
      contract: '01 Jul 2025 - 09 Jun 2026',
      preauthRequired: false,
      preauthSla: 120,
      finalAuthSla: 180,
      icdRequired: true,
      coPay: 0,
      roomCap: 0,
      integration: 'Portal + NHCX ready',
    },
    {
      id: 'master-abc',
      name: 'ABC Corporate',
      code: 'ABC-CORP',
      type: 'Corporate',
      tpa: 'Employer desk',
      pricing: 'ABC-CORP-26',
      status: 'Portal',
      contract: '01 Jan 2026 - 31 Dec 2026',
      preauthRequired: false,
      preauthSla: 240,
      finalAuthSla: 240,
      icdRequired: false,
      coPay: 5,
      roomCap: 7000,
      integration: 'Portal',
    },
  ],
  queueItems: [
    {
      id: 'T-1007',
      patient: 'Rakesh Kumar',
      detail: 'UHID M16-245901',
      payer: 'Star Health',
      stage: 'Pre-auth amendment',
      statusClass: 'badge-soft-warning',
      sla: '34 min',
      amount: 185000,
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
      amount: 76000,
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
      amount: 42300,
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
      amount: 212400,
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
      amount: 18600,
      owner: 'Billing',
      bucket: 'billing',
      action: 'Print patient reimbursement kit and receipts.',
    },
  ],
  verification: {
    mode: 'Manual phone call',
    contact: 'MediAssist Helpdesk',
    reference: 'MA-REF-983722',
    outcome: 'Verified with exclusions',
    scope: 'Ortho procedure, ward stay, diagnostics',
    notes: 'Maternity excluded; ortho covered',
    status: 'Verified',
    verifiedBy: 'Insurance Desk - Anita',
    verifiedAt: '18 May 2026, 10:42 AM',
  },
  preauth: {
    number: 'PA-STAR-2026-000487',
    status: 'Partially approved',
    requested: 185000,
    approved: 150000,
    utilized: 121400,
    due: '34 min',
    amendmentRequested: false,
  },
  billingRules: {
    coPay: 10,
    roomCap: 5000,
    deductible: 0,
  },
  billingItems: [
    {
      id: 'svc-package',
      service: 'Ortho surgery package',
      code: 'PKG-ORTHO-221',
      standard: 110000,
      contract: 95000,
      qty: 1,
      rule: 'Package covered',
      category: 'package',
    },
    {
      id: 'svc-room',
      service: 'Room rent',
      code: 'WARD-DELUXE',
      standard: 7000,
      contract: 6000,
      qty: 4,
      rule: 'Cap applies',
      category: 'room',
    },
    {
      id: 'svc-diagnostics',
      service: 'Diagnostics',
      code: 'LAB + RAD',
      standard: 22500,
      contract: 19800,
      qty: 1,
      rule: 'Covered',
      category: 'covered',
    },
    {
      id: 'svc-non-medical',
      service: 'Non-medical consumables',
      code: 'NMC-001',
      standard: 8600,
      contract: 8600,
      qty: 1,
      rule: 'Excluded',
      category: 'excluded',
    },
  ],
  claim: {
    id: 'CLM-STAR-24-7781',
    bill: 'BL-OPDIPD-99120',
    status: 'Draft packet',
    submitted: false,
    docs: {
      'Itemized bill': true,
      'Discharge summary': true,
      'Pre-auth approval': true,
      'Investigation reports': true,
      'Final authorization': false,
      'Implant stickers': false,
      'ICD/procedure code sheet': true,
      'Signed claim form': false,
    },
  },
  pricing: {
    fileName: 'STAR_ORTHO_RATES_APR_2026.xlsx',
    rows: [
      {
        service: 'PKG-ORTHO-221',
        current: 92000,
        uploaded: 95000,
        effective: '01 Apr 2026',
        status: 'Valid',
        message: 'Will activate after approval',
      },
      {
        service: 'LAB-CBC-001',
        current: 420,
        uploaded: 840,
        effective: '01 Apr 2026',
        status: 'Variance',
        message: '100% rate increase needs finance approval',
      },
      {
        service: 'RAD-MRI-999',
        current: null,
        uploaded: 3200,
        effective: '01 Apr 2026',
        status: 'Error',
        message: 'Service code not found',
      },
    ],
  },
  audit: [
    {
      time: '10:42',
      text: 'Eligibility verified manually for UHID M16-245901 by Anita.',
    },
    {
      time: '10:56',
      text: 'Pre-auth PA-STAR-2026-000487 approved amount updated from INR 0 to INR 1,50,000.',
    },
    {
      time: '11:08',
      text: 'Billing split preview generated and locked to policy snapshot.',
    },
    {
      time: '11:12',
      text: 'Document "Insurance card" downloaded by Insurance Desk.',
    },
  ],
};

let state = loadState();

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && stored.policies && stored.billingItems) return stored;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
  return structuredClone(initialState);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function structuredClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatInr(value) {
  const amount = Math.round(Number(value || 0));
  return `INR ${amount.toLocaleString('en-IN')}`;
}

function nowTime() {
  return new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function addAudit(text) {
  state.audit.unshift({ time: nowTime(), text });
  state.audit = state.audit.slice(0, 12);
  saveState();
  renderAudit();
}

function toast(title, message, type = 'success') {
  const stack = document.getElementById('toastStack');
  const item = document.createElement('div');
  item.className = `prototype-toast ${type}`;
  item.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span>`;
  stack.appendChild(item);
  setTimeout(() => item.remove(), 4200);
}

function setScreen(screen) {
  const meta = screenMeta[screen] || screenMeta.dashboard;
  state.activeScreen = screen;
  document.querySelectorAll('.screen').forEach((item) => {
    item.classList.toggle('active', item.id === `screen-${screen}`);
  });
  document.querySelectorAll('.nav-link').forEach((item) => {
    item.classList.toggle('active', item.dataset.screen === screen);
  });
  document.getElementById('screenTitle').textContent = meta.title;
  document.getElementById('screenSubtitle').textContent = meta.subtitle;
  saveState();
  renderAll();
}

function renderAll() {
  renderKpis();
  renderQueue(state.activeQueueFilter);
  renderPolicies();
  renderPolicyDocs();
  renderMasters();
  renderVerification();
  renderPreauth();
  renderBilling();
  renderClaim();
  renderPricing();
  renderAudit();
}

function renderKpis() {
  const slaCount = state.queueItems.filter((item) => item.bucket === 'sla').length;
  const docsCount = state.queueItems.filter((item) => item.bucket === 'docs').length;
  const missingDocs = Object.values(state.claim.docs).filter((done) => !done).length;
  const billing = calculateBilling();
  document.getElementById('kpiTasks').textContent = state.queueItems.length;
  document.getElementById('kpiTasksSub').textContent = `${slaCount} SLA risk tasks`;
  document.getElementById('kpiPreauth').textContent =
    state.preauth.status === 'Final authorized' ? 0 : 1;
  document.getElementById('kpiPreauthSub').textContent = `${state.preauth.due} response due`;
  document.getElementById('kpiClaims').textContent = state.claim.submitted ? 1 : 0;
  document.getElementById('kpiClaimsSub').textContent = `${formatInr(
    billing.insurer,
  )} claim value`;
  document.getElementById('kpiExceptions').textContent = docsCount + missingDocs;
  document.getElementById('kpiExceptionsSub').textContent = `${missingDocs} missing claim docs`;
}

function renderQueue(filter = 'all') {
  document.querySelectorAll('[data-queue-filter]').forEach((item) => {
    item.classList.toggle('active', item.dataset.queueFilter === filter);
  });
  const rows = state.queueItems
    .filter((item) => filter === 'all' || item.bucket === filter)
    .map(
      (item) => `
        <tr>
          <td>
            <strong>${escapeHtml(item.patient)}</strong>
            <small>${escapeHtml(item.detail)}</small>
          </td>
          <td>${escapeHtml(item.payer)}</td>
          <td><span class="badge ${item.statusClass}">${escapeHtml(item.stage)}</span></td>
          <td>${escapeHtml(item.sla)}</td>
          <td>${formatInr(item.amount)}</td>
          <td>${escapeHtml(item.owner)}</td>
          <td><button class="task-link" data-task="${escapeHtml(item.id)}">Open</button></td>
        </tr>
      `,
    )
    .join('');

  document.getElementById('queueRows').innerHTML =
    rows ||
    `<tr><td colspan="7" class="text-center text-muted">No tasks for this filter.</td></tr>`;
}

function renderPolicies() {
  const html = state.policies
    .map((policy) => {
      const selected = policy.id === state.selectedPolicyId;
      const statusClass =
        policy.status === 'Verified' ? 'badge-soft-success' : 'badge-soft-warning';
      return `
        <article class="policy-card ${selected ? 'selected' : ''}" data-policy-id="${policy.id}">
          <div class="policy-top">
            <div>
              <strong>${escapeHtml(policy.priority)} - ${escapeHtml(policy.provider)}</strong>
              <p>Policy ${escapeHtml(policy.policyNumber)} | Member ${escapeHtml(policy.memberId)}</p>
            </div>
            <span class="badge ${statusClass}">${escapeHtml(policy.status)}</span>
          </div>
          <dl>
            <div><dt>Holder</dt><dd>${escapeHtml(policy.holderType)}</dd></div>
            <div><dt>Validity</dt><dd>${escapeHtml(policy.validFrom)} - ${escapeHtml(policy.validTo)}</dd></div>
            <div><dt>Limit</dt><dd>${formatInr(policy.sumInsured)}</dd></div>
            <div><dt>Available</dt><dd>${formatInr(policy.availableBalance)}</dd></div>
          </dl>
        </article>
      `;
    })
    .join('');
  document.getElementById('policyList').innerHTML = html;
  const selected = state.policies.find((policy) => policy.id === state.selectedPolicyId);
  if (selected) fillPolicyForm(selected);
}

function fillPolicyForm(policy) {
  setValue('policyProvider', policy.provider);
  setValue('policyType', policy.type);
  setValue('policyNumber', policy.policyNumber);
  setValue('memberId', policy.memberId);
  setValue('holderType', policy.holderType);
  setValue('policyPriority', policy.priority);
  setValue('validFrom', policy.validFrom);
  setValue('validTo', policy.validTo);
  setValue('sumInsured', policy.sumInsured);
  setValue('availableBalance', policy.availableBalance);
}

function renderPolicyDocs() {
  const container = document.getElementById('policyDocs');
  container.innerHTML = Object.entries(state.policyDocs)
    .map(
      ([name, done]) =>
        `<button class="doc-pill ${done ? 'done' : 'pending'}" data-doc-toggle="${escapeHtml(
          name,
        )}">${escapeHtml(name)}</button>`,
    )
    .join('');
}

function setValue(id, value) {
  const input = document.getElementById(id);
  if (input) input.value = value ?? '';
}

function getValue(id) {
  return document.getElementById(id)?.value ?? '';
}

function newPolicy() {
  state.selectedPolicyId = null;
  fillPolicyForm({
    provider: 'Star Health Cashless',
    type: 'Cashless',
    policyNumber: '',
    memberId: '',
    holderType: 'Self',
    priority: 'Primary',
    validFrom: '2026-05-18',
    validTo: '2027-05-17',
    sumInsured: 500000,
    availableBalance: 500000,
  });
  toast('New policy mode', 'Fill details and click Save Policy.', 'success');
  setScreen('patient');
}

function savePolicy() {
  const policy = {
    id: state.selectedPolicyId || `pol-${Date.now()}`,
    provider: getValue('policyProvider'),
    type: getValue('policyType'),
    policyNumber: getValue('policyNumber').trim(),
    memberId: getValue('memberId').trim(),
    holderType: getValue('holderType'),
    priority: getValue('policyPriority'),
    validFrom: getValue('validFrom'),
    validTo: getValue('validTo'),
    sumInsured: Number(getValue('sumInsured') || 0),
    availableBalance: Number(getValue('availableBalance') || 0),
    status: state.selectedPolicyId ? 'Verified' : 'Manual check',
  };

  if (!policy.provider || !policy.policyNumber || !policy.memberId) {
    toast('Policy not saved', 'Provider, policy number, and member ID are required.', 'danger');
    return;
  }

  const existingIndex = state.policies.findIndex((item) => item.id === policy.id);
  if (existingIndex >= 0) state.policies[existingIndex] = policy;
  else state.policies.push(policy);
  state.selectedPolicyId = policy.id;
  addQueueTask({
    stage: 'Policy verification pending',
    payer: policy.provider,
    bucket: 'docs',
    owner: 'Registration',
    amount: policy.availableBalance,
    action: `Verify policy ${policy.policyNumber} before insurance billing.`,
  });
  addAudit(`Patient policy ${policy.policyNumber} saved for ${policy.provider}.`);
  saveState();
  renderAll();
  toast('Policy saved', 'Policy list, queue, and audit trail were updated.', 'success');
}

function renderMasters() {
  const grid = document.getElementById('masterGrid');
  grid.innerHTML = state.masters
    .map((master) => {
      const selected = master.id === state.selectedMasterId;
      const warning = master.status.toLowerCase().includes('expires');
      const badge = warning
        ? 'badge-soft-warning'
        : master.status === 'Active'
          ? 'badge-soft-success'
          : 'badge-soft-info';
      return `
        <article class="master-row ${selected ? 'active' : ''} ${warning ? 'warning' : ''}" data-master-id="${master.id}">
          <div>
            <strong>${escapeHtml(master.name)}</strong>
            <p>${escapeHtml(master.code)} | ${escapeHtml(master.type)} | TPA: ${escapeHtml(
              master.tpa,
            )} | Pricing: ${escapeHtml(master.pricing)}</p>
          </div>
          <span class="badge ${badge}">${escapeHtml(master.status)}</span>
        </article>
      `;
    })
    .join('');
  renderRuleList();
}

function selectedMaster() {
  return state.masters.find((master) => master.id === state.selectedMasterId) || state.masters[0];
}

function renderRuleList() {
  const master = selectedMaster();
  document.getElementById('ruleList').innerHTML = `
    <div><span>Short code</span><strong>${escapeHtml(master.code)}</strong></div>
    <div><span>Contract validity</span><strong>${escapeHtml(master.contract)}</strong></div>
    <div><span>Pre-auth SLA</span><strong>${master.preauthSla} min</strong></div>
    <div><span>Final auth SLA</span><strong>${master.finalAuthSla} min</strong></div>
    <div><span>ICD/CPT required</span><strong>${master.icdRequired ? 'Yes' : 'No'}</strong></div>
    <div><span>Co-pay default</span><strong>${master.coPay}%</strong></div>
    <div><span>Room cap</span><strong>${master.roomCap ? formatInr(master.roomCap) + '/day' : 'Not applicable'}</strong></div>
    <div><span>Integration</span><strong>${escapeHtml(master.integration)}</strong></div>
  `;
}

function openMasterEditor(isNew = false) {
  const master = isNew
    ? {
        id: `master-${Date.now()}`,
        name: '',
        code: '',
        type: 'Cashless',
        tpa: '',
        pricing: '',
        status: 'Active',
        contract: '01 Jun 2026 - 31 May 2027',
        preauthRequired: true,
        preauthSla: 60,
        finalAuthSla: 180,
        icdRequired: true,
        coPay: 10,
        roomCap: 5000,
        integration: 'Manual',
      }
    : selectedMaster();
  document.getElementById('drawerTitle').textContent = isNew
    ? 'New Insurance Master'
    : `Edit ${master.name}`;
  document.getElementById('drawerBody').innerHTML = `
    <div class="drawer-section">
      <h4>Master details</h4>
      <div class="form-grid">
        <label>Name<input id="drawerMasterName" value="${escapeHtml(master.name)}" /></label>
        <label>Short code<input id="drawerMasterCode" value="${escapeHtml(master.code)}" /></label>
        <label>Type<select id="drawerMasterType">
          ${['Cashless', 'Reimbursement', 'Corporate', 'Government Scheme', 'ESI', 'Trust']
            .map((type) => `<option ${type === master.type ? 'selected' : ''}>${type}</option>`)
            .join('')}
        </select></label>
        <label>TPA / contact<input id="drawerMasterTpa" value="${escapeHtml(master.tpa)}" /></label>
        <label>Pricing group<input id="drawerMasterPricing" value="${escapeHtml(master.pricing)}" /></label>
        <label>Integration<input id="drawerMasterIntegration" value="${escapeHtml(master.integration)}" /></label>
        <label>Co-pay %<input id="drawerMasterCopay" type="number" value="${master.coPay}" /></label>
        <label>Room cap/day<input id="drawerMasterRoomCap" type="number" value="${master.roomCap}" /></label>
      </div>
      <div class="drawer-actions">
        <button class="btn btn-light btn-sm" id="closeMasterEditor">Cancel</button>
        <button class="btn btn-primary btn-sm" data-action="save-master" data-master-save-id="${master.id}">Save Master</button>
      </div>
    </div>
  `;
  openDrawerShell();
  document.getElementById('closeMasterEditor').addEventListener('click', closeDrawer);
}

function saveMaster(id) {
  const master = {
    ...(state.masters.find((item) => item.id === id) || {}),
    id,
    name: getValue('drawerMasterName').trim(),
    code: getValue('drawerMasterCode').trim(),
    type: getValue('drawerMasterType'),
    tpa: getValue('drawerMasterTpa').trim(),
    pricing: getValue('drawerMasterPricing').trim(),
    integration: getValue('drawerMasterIntegration').trim(),
    coPay: Number(getValue('drawerMasterCopay') || 0),
    roomCap: Number(getValue('drawerMasterRoomCap') || 0),
    status: 'Active',
    contract: '01 Jun 2026 - 31 May 2027',
    preauthRequired: getValue('drawerMasterType') === 'Cashless',
    preauthSla: 60,
    finalAuthSla: 180,
    icdRequired: true,
  };

  if (!master.name || !master.code) {
    toast('Master not saved', 'Name and short code are required.', 'danger');
    return;
  }
  const duplicate = state.masters.some(
    (item) => item.id !== id && item.code.toLowerCase() === master.code.toLowerCase(),
  );
  if (duplicate) {
    toast('Duplicate short code', 'Use a unique insurance short code.', 'danger');
    return;
  }
  const index = state.masters.findIndex((item) => item.id === id);
  if (index >= 0) state.masters[index] = master;
  else state.masters.push(master);
  state.selectedMasterId = id;
  closeDrawer();
  addAudit(`Insurance master ${master.code} saved with ${master.coPay}% co-pay.`);
  saveState();
  renderAll();
  toast('Master saved', 'Contract/rule configuration was updated.', 'success');
}

function renderVerification() {
  document.getElementById('verificationSnapshot').innerHTML = `
    <div><span>Verified by</span><strong>${escapeHtml(state.verification.verifiedBy)}</strong></div>
    <div><span>Verified at</span><strong>${escapeHtml(state.verification.verifiedAt)}</strong></div>
    <div><span>Source</span><strong>${escapeHtml(state.verification.mode)}</strong></div>
    <div><span>Policy status</span><strong>${state.verification.status === 'Rejected' ? 'Inactive / failed' : 'Active'}</strong></div>
    <div><span>Eligibility</span><strong>${escapeHtml(state.verification.outcome)}</strong></div>
    <div><span>Exclusions</span><strong>${escapeHtml(state.verification.notes)}</strong></div>
  `;
  document.getElementById('verificationDocs').innerHTML = `
    <div><span>Document</span><span>Status</span></div>
    ${Object.entries(state.policyDocs)
      .map(
        ([name, done]) =>
          `<div><strong>${escapeHtml(name)}</strong><span class="badge ${
            done ? 'badge-soft-success' : 'badge-soft-warning'
          }">${done ? 'Done' : 'Pending'}</span></div>`,
      )
      .join('')}
  `;
}

function saveVerification(status) {
  state.verification = {
    mode: getValue('verificationMode'),
    contact: getValue('verificationContact'),
    reference: getValue('verificationRef'),
    outcome: status === 'Pending' ? 'Pending manual response' : getValue('verificationOutcome'),
    scope: getValue('verificationScope'),
    notes: getValue('verificationNotes'),
    status,
    verifiedBy: 'Insurance Desk - Anita',
    verifiedAt: new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
  addAudit(`Eligibility verification saved as ${status} via ${state.verification.mode}.`);
  saveState();
  renderAll();
  toast('Verification saved', `Outcome changed to ${state.verification.outcome}.`, 'success');
}

function createPreauth() {
  saveVerification('Verified');
  state.preauth.status = 'Submitted';
  state.preauth.due = '60 min';
  addQueueTask({
    stage: 'Pre-auth response due',
    payer: 'Star Health',
    bucket: 'sla',
    owner: 'Insurance Desk',
    amount: state.preauth.requested,
    action: `Follow up pre-auth ${state.preauth.number}.`,
  });
  addAudit(`Pre-auth ${state.preauth.number} created from verified eligibility.`);
  saveState();
  setScreen('preauth');
  toast('Pre-auth created', 'Tracker moved to Submitted status.', 'success');
}

function renderPreauth() {
  const approvedPct = state.preauth.approved
    ? Math.min(100, Math.round((state.preauth.utilized / state.preauth.approved) * 100))
    : 0;
  document.getElementById('preauthDueBadge').textContent =
    state.preauth.status === 'Final authorized'
      ? 'Final authorized'
      : `Due in ${state.preauth.due}`;
  document.getElementById('preauthCard').innerHTML = `
    <div class="preauth-head">
      <div>
        <strong>${escapeHtml(state.preauth.number)}</strong>
        <p>Requested ${formatInr(state.preauth.requested)} | Approved ${formatInr(
          state.preauth.approved,
        )}</p>
      </div>
      <span class="badge ${
        state.preauth.status.includes('approved') || state.preauth.status === 'Final authorized'
          ? 'badge-soft-success'
          : 'badge-soft-warning'
      }">${escapeHtml(state.preauth.status)}</span>
    </div>
    <div class="progress slim">
      <div class="progress-bar bg-success" style="width: ${approvedPct}%"></div>
    </div>
    <div class="preauth-stats">
      <div><span>Requested</span><input class="editable-input" data-preauth-field="requested" type="number" value="${state.preauth.requested}" /></div>
      <div><span>Approved</span><input class="editable-input" data-preauth-field="approved" type="number" value="${state.preauth.approved}" /></div>
      <div><span>Utilized</span><input class="editable-input" data-preauth-field="utilized" type="number" value="${state.preauth.utilized}" /></div>
      <div><span>Balance</span><strong>${formatInr(state.preauth.approved - state.preauth.utilized)}</strong></div>
    </div>
  `;
  const billing = calculateBilling();
  document.getElementById('scopeList').innerHTML = state.billingItems
    .map((item) => {
      const computed = billing.lines.find((line) => line.id === item.id);
      return `<div><strong>${escapeHtml(item.service)}</strong><span>${formatInr(
        computed.contractTotal,
      )}</span><em>${escapeHtml(computed.rule)}</em></div>`;
    })
    .join('');
  const exceeds = billing.insurer > state.preauth.approved - state.preauth.utilized;
  document.getElementById('preauthWarning').innerHTML = exceeds
    ? `<strong>Amendment suggested</strong><p>Current insurer payable exceeds available pre-auth balance by ${formatInr(
        billing.insurer - (state.preauth.approved - state.preauth.utilized),
      )}.</p>`
    : `<strong>Pre-auth balance available</strong><p>Current bill is within approved balance by ${formatInr(
        state.preauth.approved - state.preauth.utilized - billing.insurer,
      )}.</p>`;
}

function updatePreauth(field, value) {
  state.preauth[field] = Number(value || 0);
  state.preauth.status =
    state.preauth.approved < state.preauth.requested ? 'Partially approved' : 'Approved';
  addAudit(`Pre-auth ${field} changed to ${formatInr(value)}.`);
  saveState();
  renderAll();
}

function requestAmendment() {
  state.preauth.requested = Math.max(state.preauth.requested, calculateBilling().insurer + 25000);
  state.preauth.amendmentRequested = true;
  state.preauth.status = 'Amendment requested';
  addQueueTask({
    stage: 'Amendment requested',
    payer: 'Star Health',
    bucket: 'sla',
    owner: 'TPA Coordinator',
    amount: state.preauth.requested,
    action: 'Follow up enhancement/amendment amount with TPA.',
  });
  addAudit(`Pre-auth amendment requested for ${formatInr(state.preauth.requested)}.`);
  saveState();
  renderAll();
  toast('Amendment requested', 'Queue and audit trail updated.', 'warning');
}

function calculateBilling() {
  let deductibleLeft = Number(state.billingRules.deductible || 0);
  const coPay = Number(state.billingRules.coPay || 0);
  const roomCap = Number(state.billingRules.roomCap || 0);

  const lines = state.billingItems.map((item) => {
    const qty = Number(item.qty || 1);
    const standardTotal = Number(item.standard || 0) * qty;
    const contractTotal = Number(item.contract || 0) * qty;
    let eligible = contractTotal;
    let rule = item.rule;

    if (item.category === 'excluded') {
      eligible = 0;
      rule = 'Excluded';
    }
    if (item.category === 'room' && roomCap > 0) {
      eligible = Math.min(contractTotal, roomCap * qty);
      rule = `Cap ${formatInr(roomCap)}/day`;
    }

    let coPayAmount = Math.round((eligible * coPay) / 100);
    let insurer = Math.max(0, eligible - coPayAmount);
    const deductibleApplied = Math.min(deductibleLeft, insurer);
    deductibleLeft -= deductibleApplied;
    insurer -= deductibleApplied;
    const patient = contractTotal - insurer;
    const capExceeded = contractTotal > eligible;

    return {
      ...item,
      standardTotal,
      contractTotal,
      insurer,
      patient,
      rule,
      capExceeded,
      deductibleApplied,
    };
  });

  return {
    lines,
    total: lines.reduce((sum, line) => sum + line.contractTotal, 0),
    insurer: lines.reduce((sum, line) => sum + line.insurer, 0),
    patient: lines.reduce((sum, line) => sum + line.patient, 0),
  };
}

function renderBilling() {
  setValue('coPayInput', state.billingRules.coPay);
  setValue('roomCapInput', state.billingRules.roomCap);
  setValue('deductibleInput', state.billingRules.deductible);
  const billing = calculateBilling();
  document.getElementById('billingRows').innerHTML = billing.lines
    .map((line) => {
      const badge =
        line.category === 'excluded'
          ? 'badge-soft-danger'
          : line.capExceeded
            ? 'badge-soft-warning'
            : 'badge-soft-success';
      return `
        <tr>
          <td>
            <strong>${escapeHtml(line.service)}</strong>
            <small>${escapeHtml(line.code)}</small>
          </td>
          <td>
            <input class="editable-input" data-billing-id="${line.id}" data-billing-field="standard" type="number" value="${line.standard}" />
          </td>
          <td>
            <input class="editable-input" data-billing-id="${line.id}" data-billing-field="contract" type="number" value="${line.contract}" />
            <small>Qty <input class="editable-input" data-billing-id="${line.id}" data-billing-field="qty" type="number" value="${line.qty}" /></small>
          </td>
          <td><span class="badge ${badge}">${escapeHtml(line.rule)}</span></td>
          <td>${formatInr(line.insurer)}</td>
          <td>${formatInr(line.patient)}</td>
        </tr>
      `;
    })
    .join('');
  document.getElementById('billingTotal').textContent = formatInr(billing.total);
  document.getElementById('billingInsurer').textContent = formatInr(billing.insurer);
  document.getElementById('billingPatient').textContent = formatInr(billing.patient);
  document.getElementById('billingBalance').textContent = formatInr(
    state.preauth.approved - billing.insurer,
  );
  document.getElementById('billingCapBadge').textContent = billing.lines.some(
    (line) => line.capExceeded,
  )
    ? 'Cap exceeded'
    : 'Within caps';
}

function applyBillingRules() {
  state.billingRules.coPay = Number(getValue('coPayInput') || 0);
  state.billingRules.roomCap = Number(getValue('roomCapInput') || 0);
  state.billingRules.deductible = Number(getValue('deductibleInput') || 0);
  addAudit(
    `Billing rules recalculated with ${state.billingRules.coPay}% co-pay and ${formatInr(
      state.billingRules.roomCap,
    )} room cap.`,
  );
  saveState();
  renderAll();
  toast('Billing recalculated', 'Insurer and patient payable amounts were updated.', 'success');
}

function updateBillingItem(id, field, value) {
  const item = state.billingItems.find((line) => line.id === id);
  if (!item) return;
  item[field] = Number(value || 0);
  saveState();
  renderBilling();
}

function finalizeClaim() {
  const billing = calculateBilling();
  state.claim.status = 'Packet check';
  state.claim.submittedAmount = billing.insurer;
  addAudit(`Bill finalized and claim packet created for ${formatInr(billing.insurer)}.`);
  saveState();
  setScreen('claims');
  toast('Claim created', 'Claim packet is ready for document validation.', 'success');
}

function renderClaim() {
  document.getElementById('claimStatusBadge').textContent = state.claim.status;
  document.getElementById('claimStatusBadge').className = `badge ${
    state.claim.submitted ? 'badge-soft-success' : 'badge-soft-primary'
  }`;
  const missing = Object.entries(state.claim.docs).filter(([, done]) => !done);
  document.getElementById('claimChecklist').innerHTML = Object.entries(state.claim.docs)
    .map(
      ([name, done]) =>
        `<label><input type="checkbox" data-claim-doc="${escapeHtml(name)}" ${
          done ? 'checked' : ''
        } /> ${escapeHtml(name)}</label>`,
    )
    .join('');
  document.getElementById('claimWarning').className = `callout ${
    missing.length ? 'danger' : 'info'
  }`;
  document.getElementById('claimWarning').innerHTML = missing.length
    ? `<strong>${missing.length} blocking documents missing</strong><p>${missing
        .map(([name]) => name)
        .join(', ')} required before submission.</p>`
    : `<strong>Claim packet complete</strong><p>All required documents are attached. Claim can be submitted.</p>`;
  const billing = calculateBilling();
  document.getElementById('claimFinancials').innerHTML = `
    <div><span>Claim ID</span><strong>${escapeHtml(state.claim.id)}</strong></div>
    <div><span>Bill number</span><strong>${escapeHtml(state.claim.bill)}</strong></div>
    <div><span>Submitted amount</span><strong>${formatInr(
      state.claim.submittedAmount || billing.insurer,
    )}</strong></div>
    <div><span>Expected TAT</span><strong>15 days</strong></div>
    <div><span>Denial risk</span><strong>${missing.length ? 'Medium' : 'Low'}</strong></div>
    <div><span>Owner</span><strong>Insurance Desk</strong></div>
  `;
}

function toggleClaimDoc(name, checked) {
  state.claim.docs[name] = checked;
  addAudit(`Claim document "${name}" marked ${checked ? 'complete' : 'pending'}.`);
  saveState();
  renderAll();
}

function submitClaim() {
  const missing = Object.entries(state.claim.docs).filter(([, done]) => !done);
  if (missing.length) {
    toast('Claim blocked', `${missing.length} required documents are still missing.`, 'danger');
    return;
  }
  state.claim.status = 'Submitted';
  state.claim.submitted = true;
  addQueueTask({
    stage: 'Claim acknowledgement pending',
    payer: 'Star Health',
    bucket: 'sla',
    owner: 'Insurance Desk',
    amount: state.claim.submittedAmount || calculateBilling().insurer,
    action: 'Track TPA acknowledgement and payment TAT.',
  });
  addAudit(`Claim ${state.claim.id} submitted to payer.`);
  saveState();
  renderAll();
  toast('Claim submitted', 'Queue, dashboard, and audit trail were updated.', 'success');
}

function renderPricing() {
  const counts = getPricingCounts();
  document.getElementById('uploadDrop').innerHTML = `
    <div class="upload-icon">CSV</div>
    <div>
      <strong>${escapeHtml(state.pricing.fileName)}</strong>
      <p>${state.pricing.rows.length.toLocaleString('en-IN')} rows processed in dry-run mode. No database writes yet.</p>
    </div>
  `;
  document.getElementById('validationGrid').innerHTML = `
    <div class="validation-card success"><span>Valid rows</span><strong>${counts.valid}</strong></div>
    <div class="validation-card warning"><span>Warnings</span><strong>${counts.warning}</strong></div>
    <div class="validation-card danger"><span>Errors</span><strong>${counts.error}</strong></div>
    <div class="validation-card info"><span>Approval required</span><strong>${counts.approval}</strong></div>
  `;
  document.getElementById('pricingRows').innerHTML = state.pricing.rows
    .map((row) => {
      const badge =
        row.status === 'Error'
          ? 'badge-soft-danger'
          : row.status === 'Variance'
            ? 'badge-soft-warning'
            : row.status === 'Pending Approval'
              ? 'badge-soft-info'
              : 'badge-soft-success';
      return `<tr>
        <td>${escapeHtml(row.service)}</td>
        <td>${row.current ? formatInr(row.current) : '-'}</td>
        <td>${formatInr(row.uploaded)}</td>
        <td>${escapeHtml(row.effective)}</td>
        <td><span class="badge ${badge}">${escapeHtml(row.status)}</span></td>
        <td>${escapeHtml(row.message)}</td>
      </tr>`;
    })
    .join('');
}

function getPricingCounts() {
  return state.pricing.rows.reduce(
    (acc, row) => {
      if (row.status === 'Error') acc.error += 1;
      else if (row.status === 'Variance') {
        acc.warning += 1;
        acc.approval += 1;
      } else if (row.status === 'Pending Approval') acc.approval += 1;
      else acc.valid += 1;
      return acc;
    },
    { valid: 0, warning: 0, error: 0, approval: 0 },
  );
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const headers = lines[0].split(',').map((header) => header.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const columns = line.split(',').map((cell) => cell.trim());
    return headers.reduce((row, header, index) => {
      row[header] = columns[index] || '';
      return row;
    }, {});
  });
}

function runPricingDryRun(fileName, text) {
  const knownPrices = {
    'PKG-ORTHO-221': 92000,
    'LAB-CBC-001': 420,
    'WARD-DELUXE': 6000,
    'NMC-001': 8600,
  };
  const rows = parseCsv(text).map((row) => {
    const service = row['service code'] || row.service || row.code || '';
    const uploaded = Number(row['unit price'] || row.price || row.uploaded || 0);
    const current = knownPrices[service] || null;
    let status = 'Valid';
    let message = 'Will activate after approval';
    if (!service || !uploaded || uploaded <= 0) {
      status = 'Error';
      message = 'Missing service code or invalid price';
    } else if (!current) {
      status = 'Error';
      message = 'Service code not found';
    } else if (Math.abs(uploaded - current) / current > 0.25) {
      status = 'Variance';
      message = 'Rate variance above 25% needs finance approval';
    }
    return {
      service: service || 'Unknown',
      current,
      uploaded,
      effective: row['effective date'] || row.effective || '01 Jun 2026',
      status,
      message,
    };
  });
  state.pricing.fileName = fileName;
  state.pricing.rows = rows.length ? rows : state.pricing.rows;
  addAudit(`Pricing dry-run completed for ${fileName}.`);
  saveState();
  renderAll();
  toast('Pricing dry-run complete', `${rows.length} rows processed.`, 'success');
}

function proceedValidRows() {
  const activated = state.pricing.rows.filter((row) => row.status === 'Valid').length;
  state.pricing.rows = state.pricing.rows.map((row) =>
    row.status === 'Valid'
      ? { ...row, status: 'Activated', message: 'Activated for future bills' }
      : row,
  );
  addAudit(`${activated} pricing rows activated for future billing.`);
  saveState();
  renderAll();
  toast('Valid rows activated', `${activated} rows are now marked active.`, 'success');
}

function sendApproval() {
  const count = state.pricing.rows.filter((row) => row.status === 'Variance').length;
  state.pricing.rows = state.pricing.rows.map((row) =>
    row.status === 'Variance'
      ? { ...row, status: 'Pending Approval', message: 'Waiting for finance approval' }
      : row,
  );
  addQueueTask({
    stage: 'Pricing approval pending',
    payer: 'Star Health',
    bucket: 'billing',
    owner: 'Finance Manager',
    amount: count,
    action: 'Review high-variance uploaded pricing rows.',
  });
  addAudit(`${count} pricing rows sent for finance approval.`);
  saveState();
  renderAll();
  toast('Sent for approval', `${count} rows moved to finance approval.`, 'warning');
}

function renderAudit() {
  document.getElementById('auditFeed').innerHTML = state.audit
    .map(
      (item) =>
        `<div><strong>${escapeHtml(item.time)}</strong><p>${escapeHtml(item.text)}</p></div>`,
    )
    .join('');
}

function addQueueTask({ stage, payer, bucket, owner, amount, action }) {
  state.queueItems.unshift({
    id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
    patient: 'Rakesh Kumar',
    detail: 'UHID M16-245901',
    payer,
    stage,
    statusClass:
      bucket === 'sla'
        ? 'badge-soft-warning'
        : bucket === 'docs'
          ? 'badge-soft-warning'
          : 'badge-soft-info',
    sla: bucket === 'sla' ? '60 min' : 'Open',
    amount: Number(amount || 0),
    owner,
    bucket,
    action,
  });
}

function openDrawer(taskId) {
  const task =
    state.queueItems.find((item) => item.id === taskId) || state.queueItems[0];
  document.getElementById('drawerTitle').textContent = `${task.patient} - ${task.stage}`;
  document.getElementById('drawerBody').innerHTML = `
    <div class="drawer-section">
      <h4>Task summary</h4>
      <p>${escapeHtml(task.action)}</p>
      <div class="snapshot">
        <div><span>Task ID</span><strong>${escapeHtml(task.id)}</strong></div>
        <div><span>Payer</span><strong>${escapeHtml(task.payer)}</strong></div>
        <div><span>Amount</span><strong>${formatInr(task.amount)}</strong></div>
        <div><span>SLA</span><strong>${escapeHtml(task.sla)}</strong></div>
        <div><span>Owner</span><strong>${escapeHtml(task.owner)}</strong></div>
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
      <p>Opening this task records view access. Every override or document action requires reason and timestamp in the production build.</p>
    </div>
  `;
  openDrawerShell();
  addAudit(`Task ${task.id} opened by prototype reviewer.`);
}

function openDrawerShell() {
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
    renderQueue(state.activeQueueFilter);
    return;
  }

  const previousFilter = state.activeQueueFilter;
  state.activeQueueFilter = 'all';
  setScreen('dashboard');
  state.activeQueueFilter = previousFilter;
  const rows = state.queueItems
    .filter((item) =>
      `${item.patient} ${item.detail} ${item.payer} ${item.stage} ${item.amount}`
        .toLowerCase()
        .includes(value),
    )
    .map(
      (item) => `
        <tr>
          <td>
            <strong>${escapeHtml(item.patient)}</strong>
            <small>${escapeHtml(item.detail)}</small>
          </td>
          <td>${escapeHtml(item.payer)}</td>
          <td><span class="badge ${item.statusClass}">${escapeHtml(item.stage)}</span></td>
          <td>${escapeHtml(item.sla)}</td>
          <td>${formatInr(item.amount)}</td>
          <td>${escapeHtml(item.owner)}</td>
          <td><button class="task-link" data-task="${escapeHtml(item.id)}">Open</button></td>
        </tr>
      `,
    )
    .join('');

  document.getElementById('queueRows').innerHTML =
    rows ||
    `<tr><td colspan="7" class="text-center text-muted">No results found.</td></tr>`;
}

function downloadFile(name, content, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

function exportEvidence() {
  downloadFile(
    'insurance-nabh-evidence.json',
    JSON.stringify(
      {
        policies: state.policies,
        preauth: state.preauth,
        claim: state.claim,
        audit: state.audit,
      },
      null,
      2,
    ),
    'application/json',
  );
  addAudit('NABH evidence JSON exported.');
  toast('Evidence exported', 'A JSON evidence file was generated.', 'success');
}

function downloadErrors() {
  const errorRows = state.pricing.rows.filter((row) => row.status === 'Error');
  const csv = ['Service,Uploaded,Message']
    .concat(errorRows.map((row) => `${row.service},${row.uploaded},${row.message}`))
    .join('\n');
  downloadFile('pricing-upload-errors.csv', csv, 'text/csv');
  addAudit('Pricing upload error file downloaded.');
  toast('Error file downloaded', `${errorRows.length} error rows exported.`, 'success');
}

function resetDemo() {
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(initialState);
  saveState();
  renderAll();
  setScreen('dashboard');
  toast('Demo reset', 'Prototype data restored to baseline.', 'success');
}

document.addEventListener('click', (event) => {
  const action = event.target.closest('[data-action]');
  if (action) {
    const name = action.dataset.action;
    if (name === 'new-policy') newPolicy();
    if (name === 'save-policy') savePolicy();
    if (name === 'new-master') openMasterEditor(true);
    if (name === 'edit-master') openMasterEditor(false);
    if (name === 'save-master') saveMaster(action.dataset.masterSaveId);
    if (name === 'save-verification-pending') saveVerification('Pending');
    if (name === 'create-preauth') createPreauth();
    if (name === 'request-amendment') requestAmendment();
    if (name === 'proceed-billing') setScreen('billing');
    if (name === 'apply-billing-rules') applyBillingRules();
    if (name === 'print-estimate') {
      addAudit('Patient payable estimate printed from prototype.');
      window.print();
    }
    if (name === 'supervisor-override') {
      state.billingRules.deductible = 0;
      addAudit('Supervisor override applied to waive deductible/cap exception in prototype.');
      renderAll();
      toast('Override applied', 'Reason captured in audit log for prototype review.', 'warning');
    }
    if (name === 'finalize-claim') finalizeClaim();
    if (name === 'download-packet') {
      downloadFile('claim-packet-summary.txt', JSON.stringify(state.claim, null, 2));
      addAudit('Claim packet downloaded.');
      toast('Packet downloaded', 'Claim summary file generated.', 'success');
    }
    if (name === 'request-docs') {
      addQueueTask({
        stage: 'Missing claim documents',
        payer: 'Star Health',
        bucket: 'docs',
        owner: 'Insurance Desk',
        amount: calculateBilling().insurer,
        action: 'Collect missing documents before claim submission.',
      });
      addAudit('Missing claim documents requested.');
      renderAll();
      toast('Document task added', 'Missing document follow-up moved to queue.', 'warning');
    }
    if (name === 'submit-claim') submitClaim();
    if (name === 'upload-pricing') document.getElementById('pricingFile').click();
    if (name === 'download-errors') downloadErrors();
    if (name === 'proceed-valid-rows') proceedValidRows();
    if (name === 'send-approval') sendApproval();
    if (name === 'export-evidence') exportEvidence();
    if (name === 'reset-demo') resetDemo();
    return;
  }

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
    state.activeQueueFilter = filter.dataset.queueFilter;
    saveState();
    renderQueue(state.activeQueueFilter);
    return;
  }

  const task = event.target.closest('[data-task]');
  if (task) openDrawer(task.dataset.task);

  const docToggle = event.target.closest('[data-doc-toggle]');
  if (docToggle) {
    const name = docToggle.dataset.docToggle;
    state.policyDocs[name] = !state.policyDocs[name];
    addAudit(`Patient policy document "${name}" marked ${state.policyDocs[name] ? 'done' : 'pending'}.`);
    saveState();
    renderAll();
  }

  const policy = event.target.closest('[data-policy-id]');
  if (policy) {
    state.selectedPolicyId = policy.dataset.policyId;
    saveState();
    renderPolicies();
  }

  const master = event.target.closest('[data-master-id]');
  if (master) {
    state.selectedMasterId = master.dataset.masterId;
    saveState();
    renderMasters();
  }
});

document.addEventListener('change', (event) => {
  const claimDoc = event.target.closest('[data-claim-doc]');
  if (claimDoc) toggleClaimDoc(claimDoc.dataset.claimDoc, claimDoc.checked);

  const preauthField = event.target.closest('[data-preauth-field]');
  if (preauthField) updatePreauth(preauthField.dataset.preauthField, preauthField.value);

  const billingField = event.target.closest('[data-billing-field]');
  if (billingField) {
    updateBillingItem(
      billingField.dataset.billingId,
      billingField.dataset.billingField,
      billingField.value,
    );
  }
});

document.getElementById('pricingFile').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => runPricingDryRun(file.name, String(reader.result || ''));
  reader.readAsText(file);
  event.target.value = '';
});

document.getElementById('closeDrawer').addEventListener('click', closeDrawer);
document.getElementById('drawerBackdrop').addEventListener('click', closeDrawer);
document.getElementById('globalSearch').addEventListener('input', applySearch);
document.getElementById('openEvidence').addEventListener('click', () => setScreen('audit'));

renderAll();
setScreen(state.activeScreen || 'dashboard');
