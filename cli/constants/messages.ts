const messages = {
    create: {
        createTheme: {
            custom: {
                info: "Action required: Don't forget to configure your theme definition file",
            },
            exists: {
                error: 'The theme directory "{{{themePath}}" already exists!',
                info: 'If you want to create a different theme, choose a unique name or delete the existing directory',
            },
            processing: {
                info: 'Creating theme {{name}}...',
            },
        },
        createBaseTheme: {
            start: {
                info: 'Creating base theme...',
            },
            exists: {
                info: 'Skipped. Base theme {{base}} already exists in {{path}}',
            },
        },
        finalizeThemeCreation: {
            start: {
                info: 'Generating theme list...',
            },
            finish: {
                success: 'Theme creation complete!',
            },
        },
        getAvailableThemes: {
            exists: {
                warn: 'No themes found in the module path',
                info: 'Installing dependencies...',
                exists: {
                    error: 'Still no themes found in module path',
                    info: 'Please check package.json for package specified in {{path}}',
                },
            },
        },
        error: {
            unknown: 'An unknown error occurred',
        },
    },
    generateThemeList: {
        exists: {
            warn: 'Directory not found: {{dir}}',
        },
        finish: {
            success: 'Theme list generated successfully',
        },
        error: {
            unknown: 'An unknown error occurred',
        },
    },
    prebuild: {
        merge: {
            known: 'Error merging theme {{theme}}: {{error}}',
            unknown: 'An unknown error occurred while merging theme {{theme}}',
        },
        theme: {
            start: {
                info: 'No themes found in directory: {{dir}}. Skipping build...',
            },
            exists: {
                theme: {
                    error: 'Theme directory not found: {{theme}}',
                },
                base: {
                    error: 'Base theme not found: {{base}}',
                },
            },
            finish: {
                success: 'Successfully built theme: {{theme}}',
            },
            error: {
                known: 'Error processing theme {{theme}}: {{error}}',
                unknown: 'An unknown error occurred while processing theme {{theme}}',
            },
        },
        success: 'Build process completed',
        error: {
            known: 'Build process failed: {{error}}',
        },
    },
    reset: {
        confirm: 'Are you sure you want to reset the workspace? All custom themes will be deleted.',
        success: 'Reset completed',
        delete: {
            success: 'Deleted: {{target}}',
            warn: 'Not found: {{target}}',
        },
        clean: {
            success: 'Cleaned: {{path}} (kept .gitkeep)',
            warn: 'Not found: {{path}}',
        },
    },
    update: {
        start: {
            info: 'Updating base themes...',
            exit: 'No updatable base themes found in {{basePath}}. Skipping update...',
            continue: 'Base themes found in {{basePath}}:\n{{themes}}\n\nProceeding with update...',
        },
        processing: {
            info: 'Updating base theme {{theme}} ...',
            success: 'Successfully updated base theme {{theme}}',
            error: 'Error updating base theme {{theme}}: {{error}}',
        },
        finish: {
            success: 'Successfully updated all base themes',
            error: 'Some base themes were not updated due to errors. Please check the logs for more details',
            todo: ' Action required: Review the changes and incorporate any necessary modifications into your custom themes',
        },
    },
}

export default { ...messages }
