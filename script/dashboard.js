let allIssues = [];

const loadIssues = () => {
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => {
      allIssues = data.data;
      displayIssues(allIssues);
    })
    .catch(err => console.error(err));
};
function newIssue() {
  alert('Sorry 😞 This feature is not available');
}

const displayIssues = issues => {
  const container = document.getElementById('issuesContainer');
  container.innerHTML = '';

  document.getElementById('issue-count').innerText = issues.length + ' Issues';

  if (issues.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-10">
        <h2 class="text-xl font-bold">No Issues Found</h2>
      </div>
    `;
    return;
  }

  issues.forEach(issue => {
    const div = document.createElement('div');

    div.innerHTML = `
      <div class="bg-white p-6 flex flex-col h-full rounded-xl shadow-lg border-t-4 
      ${issue.status === 'open' ? 'border-emerald-500' : 'border-violet-500'}">

        <div class="flex justify-between items-start mb-4">
          <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <i class="fa-solid fa-circle text-emerald-500 text-xs"></i>
          </div>

          <span class="text-xs font-bold px-3 py-1 rounded-full 
            ${
              issue.priority === 'high'
                ? 'bg-red-100 text-red-500'
                : issue.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-green-100 text-green-600'
            }">
            ${issue.priority.toUpperCase()}
          </span>
        </div>

        <h3 onclick="openModal(${issue.id})"
            class="font-bold text-slate-800 text-lg leading-snug mb-2 cursor-pointer hover:text-blue-600">
          ${issue.title}
        </h3>

        <p class="text-slate-500 text-sm mb-4">
          ${issue.description}
        </p>

        <div class="flex gap-2 mb-6">
          ${issue.labels
            .map(label => {
              const labelColor = {
                bug: 'bg-red-100 text-red-500',
                'help wanted': 'bg-yellow-100 text-yellow-600',
                enhancement: 'bg-blue-100 text-blue-500',
                documentation: 'bg-indigo-100 text-indigo-500',
              };
              return `<span class="px-3 py-1 text-xs font-semibold rounded-full border 
              ${labelColor[label.toLowerCase()] || 'bg-gray-100 text-gray-600'}">
              ${label.toUpperCase()}
            </span>`;
            })
            .join('')}
        </div>

        <div class="pt-4 border-t text-sm text-slate-500">
          <p>#${issue.id} by ${issue.author}</p>
          <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>

      </div>
    `;

    container.appendChild(div);
  });
};

function filterIssues(status) {
  const filtered =
    status === 'all'
      ? allIssues
      : allIssues.filter(issue => issue.status === status);
  displayIssues(filtered);
  toggleStyle(status + '-btn'); //
}

function searchIssue() {
  const text = document.getElementById('search-input').value.toLowerCase();
  const filtered = allIssues.filter(issue =>
    issue.title.toLowerCase().includes(text),
  );
  displayIssues(filtered);
}

function openModal(id) {
  const issue = allIssues.find(i => i.id === id);
  if (!issue) return;

  document.getElementById('modalTitle').innerText = issue.title;
  document.getElementById('modalDesc').innerText = issue.description;
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

function toggleStyle(id) {
  const allbtn = document.getElementById('all-btn');
  const openbtn = document.getElementById('open-btn');
  const closedbtn = document.getElementById('closed-btn');

  [allbtn, openbtn, closedbtn].forEach(btn => {
    btn.classList.remove('bg-violet-600', 'text-white');
    btn.classList.add('bg-white', 'text-gray-500');
  });

  const selected = document.getElementById(id);
  selected.classList.remove('bg-white', 'text-gray-500');
  selected.classList.add('bg-violet-700', 'text-white');
}

loadIssues();
