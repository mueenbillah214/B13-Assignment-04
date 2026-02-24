let jobs = [
    { id:1, company:"Mobile First Corp", role:"React Native Developer", loc:"Remote", type:"Full-time", salary:"$130,000 - $175,000", desc:"Build cross-platform mobile applications using React Native.", status:"all"},
    { id:2, company:"WebFlow Agency", role:"Web Designer & Developer", loc:"Los Angeles, CA", type:"Part-time", salary:"$80,000 - $120,000", desc:"Create stunning web experiences for clients.", status:"all"},
    { id:3, company:"DataViz Solutions", role:"Data Visualization Specialist", loc:"Boston, MA", type:"Full-time", salary:"$125,000 - $165,000", desc:"Transform complex data into compelling visualizations.", status:"all"},
    { id:4, company:"CloudFirst Inc", role:"Backend Developer", loc:"Seattle, WA", type:"Full-time", salary:"$140,000 - $190,000", desc:"Design and maintain scalable backend systems using Python and AWS.", status:"all"},
    { id:5, company:"Innovation Labs", role:"UI/UX Engineer", loc:"Austin, TX", type:"Full-time", salary:"$110,000 - $150,000", desc:"Create beautiful and functional user interfaces.", status:"all"},
    { id:6, company:"MegaCorp Solutions", role:"JavaScript Developer", loc:"New York, NY", type:"Full-time", salary:"$130,000 - $170,000", desc:"Build enterprise applications with JS.", status:"all"},
    { id:7, company:"StartupXYZ", role:"Full Stack Engineer", loc:"Remote", type:"Full-time", salary:"$120,000 - $160,000", desc:"Join our fast-growing startup.", status:"all"},
    { id:8, company:"TechCorp Industries", role:"Senior Frontend Developer", loc:"San Francisco, CA", type:"Full-time", salary:"$130,000 - $175,000", desc:"Build scalable web applications.", status:"all"}
];

let currentTab = 'all';


function updateUI(){
    const container = document.getElementById('job-container');
    const emptyState = document.getElementById('empty-state');

    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j=>j.status==='interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j=>j.status==='rejected').length;

    const filtered = currentTab==='all'? jobs: jobs.filter(j=>j.status===currentTab);
    document.getElementById('tab-count').innerText = filtered.length;

    if(filtered.length===0){
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        container.innerHTML = filtered.map(job=>{
            const badgeLabel = job.status==='all'?'NOT APPLIED':job.status.toUpperCase();
            const badgeClass = job.status==='all'?'badge-not-applied':(job.status==='interview'?'badge-interview':'badge-rejected');

            return `
            <div class="job-card">
                <button class="delete-btn" onclick="deleteJob(${job.id})"><i class="fa-solid fa-trash-can"></i></button>
                <h3>${job.company}</h3>
                <p>${job.role}</p>
                <div class="info">${job.loc} • ${job.type} • ${job.salary}</div>
                <div class="badge ${badgeClass}">${badgeLabel}</div>
                <p>${job.desc}</p>
                <button class="interview-btn ${job.status==='interview'?'active':''}" onclick="toggleStatus(${job.id},'interview')">Interview</button>
                <button class="rejected-btn ${job.status==='rejected'?'active':''}" onclick="toggleStatus(${job.id},'rejected')">Rejected</button>
            </div>`;
        }).join('');
    }
}

function filterTab(tab){
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn=>btn.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');
    updateUI();
}
function toggleStatus(id,newStatus){
    const index = jobs.findIndex(j=>j.id===id);
    if(index!==-1){
        jobs[index].status = jobs[index].status===newStatus?'all':newStatus;
        updateUI();
    }
}

function deleteJob(id){
    jobs = jobs.filter(j=>j.id!==id);
    updateUI();
}

//Init 
updateUI(); 