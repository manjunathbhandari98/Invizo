import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import MenuBar from "../components/MenuBar/MenuBar.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/MenuBar">
                <MenuBar/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews