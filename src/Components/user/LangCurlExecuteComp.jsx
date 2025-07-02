import { Link } from "react-router-dom"
import { arrayIndex, lang } from "../../Utils"
import SyntaxHighLighter from "./SyntaxHighLighter"

function LangCurlExecuteComp() {
    return (
        <div>
            <div className="card my-3">
                <div className="card-body d-flex align-items-center p-2">
                    <small className="me-2">{`POST`}</small>
                    <small className="word-break">{`{{base_url}}/aggregator/product/api/v1/cdms`}</small>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header bg-white">
                    <h5>Languages you can test</h5>
                </div>
                <div className="card-body">
                    <div className="language-tabs">
                        {lang.map((item, i) => (
                            <img key={arrayIndex('lang', i)} src={`/assets/img/lang/${item.img}.png`} alt={item.lang}
                                className={`language-tab`} />
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
                    <SyntaxHighLighter jsonString={'{}'} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header bg-white">
                    <h5>Status Code</h5>
                </div>
                <div className="card-body">
                    <select className="form-select">
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
                    <SyntaxHighLighter jsonString={'{}'} />
                </div>
            </div>
        </div>
    )
}

export default LangCurlExecuteComp
