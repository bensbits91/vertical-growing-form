import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { colors, def_top_menu_items, def_top_menu_farItems } from './definitions';
// import * as colors from './colors';

const mcc = 'color:darkorange;';

export interface TopMenuProps {
    theme?: any;
    dark?: boolean;
    handler: any;
}

export interface TopMenuState {

}


class TopMenu extends React.Component<TopMenuProps, TopMenuState> {
    constructor(props: TopMenuProps) {
        super(props);
        this.state = {};
    }

    public render() {

        const { theme, dark, handler } = this.props;
        const color_1 = theme.color_1 ? theme.color_1 : '#222';
        const color_2 = theme.color_2 ? theme.color_2 : '#777';

        const itemStyles/* : Partial<IContextualMenuItemStyles> */ =
            dark ? {
                root: { backgroundColor: colors.black.b3 },
                rootHovered: { backgroundColor: colors.black.b5 },
                icon: { color: color_1 },
                iconHovered: { color: colors.gray.c },
                label: { color: colors.black.b9 },
                labelHovered: { color: colors.gray.c },
            }
                : {
                    icon: { color: color_1 },
                    iconHovered: { color: colors.black.b3 },
                };

        const CustomButton: React.FunctionComponent<IButtonProps> = (props: any) => {
            console.log('%c : TopMenu -> render -> props', mcc, props);
            return (
                <CommandBarButton
                    {...props}
                    onClick={e => handler(e, props.button_id)}
                    styles={{
                        ...props.styles,
                        ...itemStyles
                    }}
                />
            );
        };

        const styles_commandBar = dark ? { root: { backgroundColor: colors.black.b3 } } : {};

        return (
            <CommandBar
                items={def_top_menu_items}
                // overflowItems={def_top_menu_overflowItems}
                // overflowButtonProps={overflowProps}
                farItems={def_top_menu_farItems}
                ariaLabel='Use left and right arrow keys to navigate between commands'
                buttonAs={CustomButton}
                styles={styles_commandBar}
            />
        );
    }
}

export default TopMenu;