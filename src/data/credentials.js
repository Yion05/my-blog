// Add real entries when the certificate/award images are ready.
// { id: 'unique-id', type: 'certificate' | 'award', title: '...',
//   issuer: '...', date: '2026', image: '/pictures/certificates/file.jpg',
//   description: '...', verificationUrl: 'https://...' (optional) }
export const credentials = [
    {
        id: 'infineon-internship-2026',
        type: 'certificate',
        title: 'Internship Program',
        issuer: 'Infineon Technologies (Malaysia) Sdn. Bhd.',
        date: '2026',
        image: '/pictures/certificates/infineon-internship-2026.jpeg',
        description: 'Successfully completed the internship program from 27 July to 17 October 2026.',
        descriptionSegments: [
            { text: 'Successfully completed the ' },
            { text: 'internship program', tone: 'purple' },
            { text: ' from ' },
            { text: '27 July to 17 October 2026', tone: 'yellow' },
            { text: '.' },
        ],
    },
    {
        id: 'mmu-deans-award-march-2026',
        type: 'award',
        title: "Dean's Award",
        issuer: 'Multimedia University',
        date: 'March 2026',
        image: '/pictures/certificates/mmu-deans-award-march-2026.png',
        description: "Placed on the Dean's List for the March 2026 trimester, Faculty of Information Science & Technology.",
        descriptionSegments: [
            { text: 'Placed on the ' },
            { text: "Dean's List", tone: 'yellow' },
            { text: ' for the ' },
            { text: 'March 2026', tone: 'purple' },
            { text: ' trimester, Faculty of ' },
            { text: 'Information Science & Technology', tone: 'cyan' },
            { text: '.' },
        ],
    },
]
