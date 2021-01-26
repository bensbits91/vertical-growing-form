import * as React from 'react';
import { IDynamicFormTestProps } from './IDynamicFormTestProps';
import Form from './Form';
import * as colors from './colors';
import './temp.css';

export default class DynamicFormTest extends React.Component<IDynamicFormTestProps, {}> {
    public render(): React.ReactElement<IDynamicFormTestProps> {


        const cards =
            <Form
                web='https://ntandem.sharepoint.com/sites/DemoDataSource01'
                list='CI Requests'
                isAdmin={false}
                theme={{
                    color_1: colors.mint,
                    color_2: colors.pink
                }}
            />;

        return (
            <>
                {/* 
                 */}
                {cards}
                {/* 
                 */}
            </>
        );
    }
}