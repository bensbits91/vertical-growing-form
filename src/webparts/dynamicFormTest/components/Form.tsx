import * as React from 'react';
import { Web } from "@pnp/sp/presets/all";
import TopMenu from './TopMenu';
import Section from './Section';
import { def_sections, colors } from './definitions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ScrollablePane, ScrollbarVisibility } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import './animation.css';

const mcc = 'color:yellow;';

export interface FormProps {
    web: string;
    list: string;
    isAdmin: boolean;
    layout?: string;
    theme?: any;
}

export interface FormState {
    sections: any;
    visible_sections: any;
    compact: boolean;
    dark: boolean;
}

class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            sections: null,
            visible_sections: [],
            // visible_sections: ['top'],
            compact: true,
            dark: false
        };
        this.handler_top_menu = this.handler_top_menu.bind(this);
        this.handler_section = this.handler_section.bind(this);
    }

    public componentDidMount() {
        console.clear();
        this.getData_fields().then((fields: any) => {
            // console.log('%c : Form -> componentDidMount -> fields', mcc, fields);
            this.update_sections(fields).then(s => {
                this.setState({
                    sections: s
                });
            });
        });
    }

    public componentDidUpdate(prevProps: FormProps, prevState: FormState) {
        console.log('%c : Form -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public getData_fields = () => new Promise(resolve => {
        const the_web = Web(this.props.web);
        the_web.lists.getByTitle('CI Requests').fields
            .filter("Hidden eq false and ReadOnlyField eq false and InternalName ne 'ContentType'")
            .select('TypeAsString', 'InternalName', 'Title', 'Required', 'SchemaXml', 'FieldTypeKind', 'Choices', 'Description')
            .get().then(fields => {
                resolve(fields);
            });
    })

    public update_sections = (fields) => new Promise(resolve => {
        def_sections.map(section => {
            section.fields.map((sf: any) => {
                const match = fields.filter(f => f.InternalName == sf.InternalName)[0];
                sf.Title = match.Title;
                sf.TypeAsString = match.TypeAsString;
                sf.Required = match.Required;
                if (match.Choices) sf.Choices = match.Choices;
                if (match.Description) sf.Description = match.Description;
            });
        });
        resolve(def_sections);
    })

    public handler_top_menu(event, button) {
        console.log('%c : Form -> handler_top_menu -> event', mcc, event);
        console.log('%c : Form -> handler_top_menu -> button', mcc, button);
        if (button == 'size') this.setState({ compact: !this.state.compact });
        else if (button == 'mode') this.setState({ dark: !this.state.dark });
        else if (button == 'info') {
            setTimeout(() => {
                this.setState({ visible_sections: ['top'] });
            }, 2000);
        }
    }

    public handler_section(field, value) {
        console.log('%c : Form -> handler_section -> value', mcc, value);
        console.log('%c : Form -> handler_section -> field', mcc, field);

        if (field.InternalName == 'RequestType')
            this.setState({ visible_sections: ['top', value.key] });

        else if (field.go_to_section && value && value.key != 'noselection')
            this.setState({ visible_sections: [...this.state.visible_sections, field.go_to_section] });
    }


    public render() {

        const { sections, dark, compact } = this.state;
        // console.log('%c : Form -> render -> sections', mcc, sections);
        const { theme } = this.props;

        const SectionCardSlide = (s) => {
            return (
                <CSSTransition
                    key={s.id}
                    // timeout={1000}
                    timeout={{
                        // appear: 1000,
                        enter: 1000,
                        // exit: 1,
                    }}
                    classNames={'slide'}
                >
                    <Section
                        key={s.id}
                        section_id={s.id}
                        heading={s.heading}
                        fields={s.fields}
                        handler={this.handler_section}
                        theme={theme}
                        dark={dark}
                    />
                </CSSTransition>
            );
        };

        const section_list = sections ?
            sections.map(s => {
                const is_visible = this.state.visible_sections.indexOf(s.id) > - 1;
                console.log('%c : Form -> render -> is_visible', mcc, is_visible);
                if (is_visible) {
                    return (
                        SectionCardSlide(s)
                    );
                }
            })
            : <></>;

        let classes = 'form-wrap';
        if (compact) classes += ' compact';
        if (dark) classes += ' dark';

        const styles_formWrap = dark ? { backgroundColor: colors.black.b2 } : {};
        const styles_h1 = dark ? { color: colors.black.b8 } : { color: colors.gray.a };

        return (
            <div className={classes} style={styles_formWrap}>
                <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
                    <Sticky stickyPosition={StickyPositionType.Header}>
                        <TopMenu
                            theme={theme}
                            dark={dark}
                            handler={this.handler_top_menu}
                        />
                    </Sticky>
                    <h1 style={styles_h1}>Request Form</h1>
                    <TransitionGroup>
                        {section_list}
                    </TransitionGroup>
                </ScrollablePane>
            </div>
        );
    }
}

export default Form;