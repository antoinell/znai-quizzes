import {ZnaiSelect} from './ZnaiSelect';

export function ZnaiSelectDemo() {
    return(
    <ZnaiSelect options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ]} selectedOption={{ value: 'chocolate', label: 'Chocolate' }} />);
}

export default ZnaiSelectDemo



