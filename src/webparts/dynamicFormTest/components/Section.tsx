import * as React from 'react';
import FieldDropDown from './FieldDropDown';
import FieldText from './FieldText';
import FieldDatePicker from './FieldDatePicker';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { colors } from './definitions';
// import * as colors from './colors';


import ScrollToBottom from 'react-scroll-to-bottom';




const mcc = 'color:aqua;';

export interface SectionProps {
    section_id: string;
    heading: string;
    fields: any;
    columns?: number; // NOT USED YET - MAKE MULTI-COL SECTIONS
    theme?: any;
    dark?: boolean;
    handler: any;
}

export interface SectionState {
    completed_fields: any;
}

class Section extends React.Component<SectionProps, SectionState> {


    private myRef: React.RefObject<HTMLInputElement>;



    constructor(props: SectionProps) {
        super(props);



        this.myRef = React.createRef();



        this.state = {
            completed_fields: null
        };
        this.handler_fields = this.handler_fields.bind(this);
    }

    public componentDidMount() {
        console.log('%c : Section -> componentDidMount -> this.props', mcc, this.props);
        // console.log('%c : Section -> componentDidMount -> this.myRef', mcc, this.myRef);
        // this.myRef.current.scrollIntoView({ behavior: 'smooth' }); // scrolls to this on every scroll and state change - DISABLE FOR LIVE DEMOS (OR FIX)
    }

    public componentDidUpdate(prevProps: SectionProps, prevState: SectionState) {
        console.log('%c : Section -> componentDidUpdate -> this.state', mcc, this.state);
        // console.log('%c : Section -> componentDidUpdate -> this.myRef', mcc, this.myRef);
        this.myRef.current.scrollIntoView({ behavior: 'smooth' }); // scrolls to this on every scroll and state change - DISABLE FOR LIVE DEMOS (OR FIX)

    }

    public handler_fields(field, value) {
        console.log('%c : Section -> handler_fields -> field', mcc, field);
        console.log('%c : Section -> handler_fields -> value', mcc, value);
        // console.log('%c : Section -> handler_fields -> event.target', mcc, event.target);
        // console.log('%c : Section -> handler_fields -> event.target.dataset', mcc, event.target.dataset);


        if (value && value.key != 'noselection') {
            console.log('%c : Section -> handler_fields -> value', mcc, value);
            const { completed_fields } = this.state;
            let new_cf = JSON.parse(JSON.stringify(completed_fields));
            if (new_cf) new_cf.push(field.InternalName);
            else new_cf = [field.InternalName];
            this.setState({
                completed_fields: new_cf
            });
        }

        // const goto = field.getAttribute('data-go-to-section');
        // console.log('%c : Section -> handler_fields -> goto', mcc, goto);

        this.props.handler(field, value/* , goto */);

    }

    // public handler_fields_dates(date) {
    //     console.log('%c : Section -> handler_fields_dates -> date', mcc, date);
    // }



    public render() {

        console.log('%c : Section -> render -> this.myRef', mcc, this.myRef);

        const { theme, dark } = this.props;

        const buttons = this.props.section_id == 'end' ?
            <div className='button-wrap'>
                <PrimaryButton
                    text='Save Draft'
                    onClick={() => console.log('Save Draft')}
                    styles={{ root: { backgroundColor: theme.color_1 } }}
                />
                <PrimaryButton
                    text='Request Review'
                    onClick={() => console.log('Request Review')}
                    styles={{ root: { backgroundColor: theme.color_1 } }}
                />
                <PrimaryButton
                    text='Approve'
                    onClick={() => console.log('Approve')}
                    styles={{ root: { backgroundColor: theme.color_1 } }}
                    disabled
                />
                {/* <PrimaryButton
                    text='Request Changes'
                    onClick={() => console.log('Request Changes')}
                    styles={{ root: { backgroundColor: theme.color_1 } }}
                    disabled
                /> */}
                <PrimaryButton
                    text='Reject'
                    onClick={() => console.log('Reject')}
                    styles={{ root: { backgroundColor: theme.color_1 } }}
                    disabled
                />
                <PrimaryButton
                    text='Start Over'
                    onClick={() => console.log('Start Over')}
                    styles={{ root: { backgroundColor: theme.color_1 } }}
                />
                <PrimaryButton
                    text='Cancel & Go Home'
                    onClick={() => console.log('Cancel & Go Home')}
                    styles={{ root: { backgroundColor: theme.color_1 } }}
                />
            </div>
            : <></>;

        return (
            // <ScrollToBottom></ScrollToBottom>
            <div
                // ref={this.myRef}
                className='section-wrap'
                style={dark ? { backgroundColor: colors.black.b3 } : { backgroundColor: '#fff' }}
            >

                {this.props.heading ? <h2 style={{ color: theme.color_1 }}>{this.props.heading}</h2> : <></>}

                {this.props.fields.map(f => {
                    console.log('%c : Section -> render -> f', mcc, f);

                    if (!f.prereq || (this.state.completed_fields && this.state.completed_fields.indexOf(f.prereq) > - 1)) {

                        if (f.TypeAsString == 'Choice')
                            return <FieldDropDown
                                field={f}
                                handler={(field, value) => this.handler_fields(field, value)}
                                dark={dark}
                                theme={theme}
                            />;

                        else if (f.TypeAsString == 'Text' || f.TypeAsString == 'Note')
                            return <FieldText
                                field={f}
                                handler={(field, value) => this.handler_fields(field, value)}
                                multiline={f.TypeAsString == 'Note'}
                                rows={6}
                                dark={dark}
                                theme={theme}
                            />;

                        else if (f.TypeAsString == 'DateTime')
                            return <FieldDatePicker
                                field={f}
                                handler={(field, value) => this.handler_fields(field, value)}
                                dark={dark}
                                theme={theme}
                            />;

                    }
                })}

                {buttons}
                <div style={{ float: 'left', clear: 'both' }} // scrolls to this on every scroll and state change
                    ref={this.myRef}>
                </div>
            </div>
        );
    }
}

export default Section;