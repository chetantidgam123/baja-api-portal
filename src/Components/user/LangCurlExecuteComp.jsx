import { Link } from "react-router-dom"
import { arrayIndex, generators, lang } from "../../Utils"
import SyntaxHighLighter from "./SyntaxHighLighter"
import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
function LangCurlExecuteComp({ apiData }) {
    const [sampleRes, setSampleRes] = useState(null);
    const [sampleReq, setSampleReq] = useState(null);

    const generateLangReq = (lang) => {
        let res = generators[lang](apiData);
        setSampleReq(res);
    }
    const genrateCodeRes = (code) => {
        if (code) {
            let res = apiData.response.filter((c) => c.statusCode == code);
            setSampleRes(res[0].response);
        } else {
            setSampleRes({});
        }
    }
    useEffect(() => {
        if (!sampleReq) {
            generateLangReq('curl')
        }
    }, [])
    return (
        <div>
            <div className="card my-3">
                <div className="card-body d-flex align-items-center p-2">
                    <small className="me-2">{apiData.method}</small>
                    <small className="word-break">{apiData.url}</small>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header bg-white">
                    <h5>Languages you can test</h5>
                </div>
                <div className="card-body">
                    <div className="language-tabs">
                        {lang.map((item, i) => (
                            <button className="span-btn" key={arrayIndex('lang', i)} onClick={() => { generateLangReq(item.lang) }}>
                                <img src={`/assets/img/lang/${item.img}.png`} alt={item.lang}
                                    className={`language-tab`} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Request Sample</h5>
                        <Link><img src="/assets/img/copy.png" alt="copy" /></Link>
                    </div>
                </div>
                <div className="card-body">
                    <SyntaxHighLighter jsonString={sampleReq} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header bg-white">
                    <h5>Status Code</h5>
                </div>
                <div className="card-body">
                    <select className="form-select" onChange={(e) => { genrateCodeRes(e.target.value) }}>
                        <option value="">Select status Code</option>
                        <option value="200">200</option>
                        <option value="201">201</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                    </select>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Response Sample</h5>
                        <Link><img src="/assets/img/copy.png" alt="copy" /></Link>
                    </div>
                </div>
                <div className="card-body">
                    <SyntaxHighLighter jsonString={JSON.stringify(sampleRes || {}, null, 2)} />
                </div>
            </div>
        </div>
    )
}

LangCurlExecuteComp.propTypes = {
    apiData: PropTypes.any,
}

export default LangCurlExecuteComp
