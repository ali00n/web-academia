// Update member count from API
async function updateMemberCount() {
    try {
        const response = await fetch('http://localhost:3001/api/stats');
        if (response.ok) {
            const data = await response.json();
            const memberCountEl = document.getElementById('member-count');
            if (memberCountEl && data.totalMembers !== undefined) {
                memberCountEl.textContent = data.totalMembers + '+';
            }
        }
    } catch (error) {
        console.error('Erro ao carregar contador de membros:', error);
    }
}

// Update on page load
document.addEventListener('DOMContentLoaded', updateMemberCount);

export { updateMemberCount };
