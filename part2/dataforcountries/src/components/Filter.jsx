/* eslint-disable react/prop-types */
const Filter = ({text,onInputChange}) => {
    return (
        <div>
            {text}<input type="text" onChange={onInputChange} />
        </div>
    )
}
export default Filter;