import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';

export const

    colors = {
        navy: {
            main: '#1e3b5a',
            light: '#78899c',
        },
        mint: {
            main: '#34bebd',
            light: '#1f7271',
        },
        green: '#34be78',
        yellow: '#ffc658',
        orange: '#ff7300',
        red: '#be3435',
        pink: '#be347a',
        gray: {
            e: '#eee',
            d: '#ddd',
            c: '#ccc',
            b: '#bbb',
            a: '#aaa',
        },
        black: {
            b9: '#999',
            b8: '#888',
            b7: '#777',
            b5: '#555',
            b4: '#444',
            b3: '#333',
            b2: '#222'
        }
    },

    def_sections = [
        {
            id: 'top',
            heading: 'Start here',
            fields: [
                { InternalName: 'RequestType' },
                // {InternalName: 'Title'},
            ]
        },
        {
            id: 'AskaQuestion',
            heading: 'Ask a question',
            fields: [
            ]
        },
        {
            id: 'MakeaSuggestion',
            heading: 'Make a suggestion',
            fields: [
            ]
        },
        {
            id: 'RequestaPurchase',
            heading: 'Request a purchase',
            fields: [
                { InternalName: 'PurchaseType' },
            ]
        },
        {
            id: 'RequestTraining',
            heading: 'Request some training',
            fields: [
                { InternalName: 'TrainingType' },
            ]
        },
        {
            id: 'RequestTravel',
            heading: 'Request travel',
            fields: [
                { InternalName: 'TravelReason' },
                {
                    InternalName: 'TravelType',
                    prereq: 'TravelReason',
                    go_to_section: 'TravelDetails'
                },
            ]
        },
        {
            id: 'TravelDetails',
            heading: 'Travel details',
            fields: [
                { InternalName: 'StartDate' },
                { InternalName: 'EndDate' },
                {
                    InternalName: 'DatesFlexible',
                    // prereq: 'EndDate',
                },
                {
                    InternalName: 'HasItinerary',
                    prereq: 'DatesFlexible',
                },
                {
                    InternalName: 'NeedLodging',
                    prereq: 'HasItinerary',
                    go_to_section: 'end'
                },
            ]
        },
        {
            id: 'ReportanIssue',
            heading: 'Report an issue',
            fields: [
                { InternalName: 'IssueType' },
            ]
        },
        {
            id: 'end',
            heading: 'Almost done',
            fields: [
                { InternalName: 'Comments' },
            ]
        },
    ],

    def_top_menu_items: ICommandBarItemProps[] = [
        {
            key: 'newItem',
            text: 'New',
            cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
            iconProps: { iconName: 'Add' },
            subMenuProps: {
                items: [
                    {
                        key: 'emailMessage',
                        text: 'Email message',
                        iconProps: { iconName: 'Mail' },
                        ['data-automation-id']: 'newEmailButton' // optional
                    },
                    {
                        key: 'calendarEvent',
                        text: 'Calendar event',
                        iconProps: { iconName: 'Calendar' }
                    }
                ]
            }
        },
        {
            key: 'upload',
            text: 'Upload',
            iconProps: { iconName: 'Upload' },
            href: 'https://dev.office.com/fabric'
        },
        {
            key: 'share',
            text: 'Share',
            iconProps: { iconName: 'Share' },
            onClick: () => console.log('Share')
        },
        {
            key: 'download',
            text: 'Download',
            iconProps: { iconName: 'Download' },
            onClick: () => console.log('Download')
        }
    ],

    def_top_menu_overflowItems: ICommandBarItemProps[] = [
        { key: 'move', text: 'Move to...', onClick: () => console.log('Move to'), iconProps: { iconName: 'MoveToFolder' } },
        { key: 'copy', text: 'Copy to...', onClick: () => console.log('Copy to'), iconProps: { iconName: 'Copy' } },
        { key: 'rename', text: 'Rename...', onClick: () => console.log('Rename'), iconProps: { iconName: 'Edit' } }
    ],

    def_top_menu_farItems: ICommandBarItemProps[] = [
        {
            key: 'size',
            button_id: 'size',
            text: 'Toggle compact mode',
            ariaLabel: 'Toggle compact mode', // This needs an ariaLabel since it's icon-only
            iconOnly: true,
            iconProps: { iconName: 'SizeLegacy' },
        },
        {
            key: 'mode',
            button_id: 'mode',
            text: 'Toggle dark mode',
            ariaLabel: 'Toggle dark mode',
            iconOnly: true,
            iconProps: { iconName: 'ClearNight' },
        },
        {
            key: 'tile',
            button_id: 'tile',
            text: 'Grid view',
            ariaLabel: 'Grid view',
            iconOnly: true,
            iconProps: { iconName: 'Tiles' },
        },
        {
            key: 'info',
            button_id: 'info',
            text: 'Info',
            ariaLabel: 'Info',
            iconOnly: true,
            iconProps: { iconName: 'Info' },
        }
    ]


    ;