// FEMA Disaster Declarations Widget (Modular JS)
(function(global) {
  function initFemaWidget(targetId) {
    const container = document.getElementById(targetId);
    if (!container) return;
    container.innerHTML = `
      <div class="fema-widget-header" style="font-size:1.5rem;font-weight:bold;margin-bottom:18px;text-align:center;">US Disaster Declarations</div>
      <div class="fema-widget-controls" style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px;align-items:center;justify-content:space-between;">
        <input type="text" id="fema-search-${targetId}" placeholder="Search disasters..." style="padding:6px 10px;border-radius:4px;border:1px solid #ccc;font-size:1rem;" />
        <select id="fema-state-${targetId}"><option value="">All States</option></select>
        <select id="fema-type-${targetId}"><option value="">All Types</option></select>
        <select id="fema-sort-${targetId}">
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
      <div class="fema-widget-results" id="fema-results-${targetId}" style="max-height:400px;overflow-y:auto;border:1px solid #eee;border-radius:8px;background:#fafbfc;padding:0;"></div>
      <div class="fema-widget-pagination" id="fema-pagination-${targetId}" style="display:flex;justify-content:center;align-items:center;gap:10px;margin-top:16px;"></div>
    `;
    const API_URL = 'https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries';
    const PAGE_SIZE = 10;
    let allData = [];
    let filteredData = [];
    let currentPage = 1;
    let states = new Set();
    let types = new Set();
    const searchInput = document.getElementById(`fema-search-${targetId}`);
    const stateSelect = document.getElementById(`fema-state-${targetId}`);
    const typeSelect = document.getElementById(`fema-type-${targetId}`);
    const sortSelect = document.getElementById(`fema-sort-${targetId}`);
    const resultsDiv = document.getElementById(`fema-results-${targetId}`);
    const paginationDiv = document.getElementById(`fema-pagination-${targetId}`);
    async function fetchData() {
      let page = 1;
      let more = true;
      let data = [];
      while (more && page <= 10) {
        const url = `${API_URL}?$orderby=declarationDate desc&$top=100&$skip=${(page-1)*100}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.DisasterDeclarationsSummaries && json.DisasterDeclarationsSummaries.length > 0) {
          data = data.concat(json.DisasterDeclarationsSummaries);
          more = json.DisasterDeclarationsSummaries.length === 100;
          page++;
        } else {
          more = false;
        }
      }
      return data;
    }
    function populateFilters(data) {
      data.forEach(item => {
        if (item.state) states.add(item.state);
        if (item.incidentType) types.add(item.incidentType);
      });
      Array.from(states).sort().forEach(state => {
        const opt = document.createElement('option');
        opt.value = state;
        opt.textContent = state;
        stateSelect.appendChild(opt);
      });
      Array.from(types).sort().forEach(type => {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      });
    }
    function filterAndSort() {
      const search = searchInput.value.trim().toLowerCase();
      const state = stateSelect.value;
      const type = typeSelect.value;
      const sort = sortSelect.value;
      filteredData = allData.filter(item => {
        let match = true;
        if (search) {
          match = (
            (item.declarationTitle && item.declarationTitle.toLowerCase().includes(search)) ||
            (item.incidentType && item.incidentType.toLowerCase().includes(search)) ||
            (item.state && item.state.toLowerCase().includes(search))
          );
        }
        if (state && item.state !== state) match = false;
        if (type && item.incidentType !== type) match = false;
        return match;
      });
      filteredData.sort((a, b) => {
        const dateA = new Date(a.declarationDate);
        const dateB = new Date(b.declarationDate);
        return sort === 'desc' ? dateB - dateA : dateA - dateB;
      });
      currentPage = 1;
      renderResults();
      renderPagination();
    }
    function renderResults() {
      resultsDiv.innerHTML = '';
      if (filteredData.length === 0) {
        resultsDiv.innerHTML = '<div style="padding:20px; color:#888;">No results found.</div>';
        return;
      }
      const start = (currentPage - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const pageData = filteredData.slice(start, end);
      pageData.forEach(item => {
        const row = document.createElement('div');
        row.className = 'fema-widget-row';
        row.style = 'display:flex;flex-wrap:wrap;align-items:center;border-bottom:1px solid #ececec;padding:12px 10px;font-size:1rem;';
        row.innerHTML = `
          <div class="fema-widget-col" style="flex:1 1 120px;min-width:100px;padding:2px 8px;word-break:break-word;"><a href="https://www.fema.gov/disaster/${item.disasterNumber}" target="_blank" rel="noopener noreferrer"><strong>#${item.disasterNumber}</strong></a></div>
          <div class="fema-widget-col" style="flex:1 1 120px;min-width:100px;padding:2px 8px;word-break:break-word;">${item.state || ''}</div>
          <div class="fema-widget-col" style="flex:1 1 120px;min-width:100px;padding:2px 8px;word-break:break-word;">${item.incidentType || ''}</div>
          <div class="fema-widget-col fema-widget-col-title" style="flex:1 1 120px;min-width:100px;padding:2px 8px;word-break:break-word;font-weight:600;color:#1a237e;">${item.declarationTitle || ''}</div>
          <div class="fema-widget-col" style="flex:1 1 120px;min-width:100px;padding:2px 8px;word-break:break-word;">${item.declarationDate ? new Date(item.declarationDate).toLocaleDateString() : ''}</div>
        `;
        resultsDiv.appendChild(row);
      });
    }
    function renderPagination() {
      paginationDiv.innerHTML = '';
      const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
      if (totalPages <= 1) return;
      const prevBtn = document.createElement('button');
      prevBtn.textContent = 'Prev';
      prevBtn.disabled = currentPage === 1;
      prevBtn.onclick = () => { currentPage--; renderResults(); renderPagination(); };
      const nextBtn = document.createElement('button');
      nextBtn.textContent = 'Next';
      nextBtn.disabled = currentPage === totalPages;
      nextBtn.onclick = () => { currentPage++; renderResults(); renderPagination(); };
      const pageInfo = document.createElement('span');
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
      paginationDiv.appendChild(prevBtn);
      paginationDiv.appendChild(pageInfo);
      paginationDiv.appendChild(nextBtn);
    }
    searchInput.addEventListener('input', filterAndSort);
    stateSelect.addEventListener('change', filterAndSort);
    typeSelect.addEventListener('change', filterAndSort);
    sortSelect.addEventListener('change', filterAndSort);
    resultsDiv.innerHTML = '<div style="padding:20px; color:#888;">Loading...</div>';
    fetchData().then(data => {
      allData = data;
      populateFilters(allData);
      filterAndSort();
    }).catch(() => {
      resultsDiv.innerHTML = '<div style="padding:20px; color:#c00;">Failed to load data from FEMA API.</div>';
    });
  }
  global.initFemaWidget = initFemaWidget;
})(window); 