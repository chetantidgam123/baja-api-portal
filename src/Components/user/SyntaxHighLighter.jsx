import SyntaxHighlighter from 'react-syntax-highlighter';
import { xt256 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import PropTypes from 'prop-types';
function SyntaxHighLighter({ jsonString }) {
    return (
        <SyntaxHighlighter language="javascript" style={xt256}>
            {jsonString}
        </SyntaxHighlighter>
    )
}
SyntaxHighLighter.propTypes = {
    jsonString: PropTypes.string,
}
export default SyntaxHighLighter
