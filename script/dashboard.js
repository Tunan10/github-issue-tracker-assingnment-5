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
