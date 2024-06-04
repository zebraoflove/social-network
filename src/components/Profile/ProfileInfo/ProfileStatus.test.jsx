import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus component', ()=>{
    test('Span should be exist after render', ()=>{
        const component = create(<ProfileStatus status={"Test status"}/>)
        const root = component.root
        const span = root.findByType("span")
        expect(span).not.toBeNull()
    })
    test('Span should be exist with correct status', ()=>{
        const component = create(<ProfileStatus status={"Test status"}/>)
        const root = component.root
        const span = root.findByType("span")
        expect(span.children[0]).toBe("Test status")
    })
    test('Input should not be exist after render', () => {
        const component = create(<ProfileStatus status={"Test status"}/>)
        const root = component.root
        expect(()=>{
            const input = root.findByType("input");
        }).toThrow()
    })
    test('After double click on span, input should be shown with correct status', () => {
        const component = create(<ProfileStatus status={"Test status"}/>)
        const root = component.root
        const span = root.findByType("span")
        span.props.onDoubleClick()
        const input = root.findByType("input")
        expect(input.props.value).toBe("Test status")
    })
})