const input = {
    create: {
        selectThemeType: {
            matrix: [
                ['Criteria', 'Extended FC Theme', 'Full FC Theme', 'Custom Theme'],
                [
                    ['Maintenance', 'Low', 'Medium', 'High'],
                    ['Adjustability', 'Moderate', 'Moderate', 'Complete'],
                    ['Implementation Time', 'Short', 'Medium', 'Long'],
                ],
                'Decision Matrix for Theme Options',
                'white',
                {
                    Low: 'green',
                    Medium: 'yellow',
                    High: 'red',
                    Short: 'green',
                    Long: 'red',
                    Limited: 'red',
                    Moderate: 'yellow',
                    Complete: 'green',
                },
            ],
        },
    },
}

export default input
