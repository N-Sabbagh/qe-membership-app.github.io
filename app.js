const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(button => {
    button.addEventListener('click', function () {
        const target = this.getAttribute('data-target');

        sections.forEach(section => {
            section.classList.remove('visible');
            section.classList.add('hidden');
        });

        const targetSection = document.getElementById(target);
        targetSection.classList.remove('hidden');
        targetSection.classList.add('visible');
    });
});

document.getElementById('file-section').classList.add('visible');

document.getElementById('load-file').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('records-display').textContent = e.target.result;
        };
        reader.readAsText(file);
    } else {
        alert('Please select a file.');
    }
});

document.getElementById('print-records').addEventListener('click', function() {
    const text = document.getElementById('records-display').textContent;
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'records.txt';
    link.click();
});

document.getElementById('member-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const member = {
        membershipNumber: document.getElementById('membership-number').value,
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        address: document.getElementById('address').value,
        postcode: document.getElementById('postcode').value,
        gender: document.getElementById('gender').value,
        joinDate: document.getElementById('join-date').value,
        membershipType: document.getElementById('membership-type').value,
        subscriptionMonth: document.getElementById('subscription-month').value
    };

    const record = `
    Membership Number: ${member.membershipNumber}
    First Name: ${member.firstName}
    Last Name: ${member.lastName}
    Address: ${member.address}
    Postcode: ${member.postcode}
    Gender: ${member.gender}
    Join Date: ${member.joinDate}
    Membership Type: ${member.membershipType}
    Subscription Due Month: ${member.subscriptionMonth}
    `;

    document.getElementById('records-display').textContent += record + '\n';
});
