import { Accordion, Badge } from "react-bootstrap"
import { arrayIndex, sidebardata } from "../../../Utils"
import PropTypes from 'prop-types';
function Sidebar({ setPageData }) {
    return (
        <div className="sidebar bg-white">
            <Accordion className="m-3">
                {
                    sidebardata.map((item, i) =>
                    (<Accordion.Item key={arrayIndex('acc', i)} eventKey={i} onClick={() => { setPageData(item) }}>
                        <Accordion.Header className={item.category.length <= 0 ? "disabled" : ""}><img src="/assets/img/sidebaricon.png" className="me-2" alt="NA"></img> {item.collection_name}</Accordion.Header>
                        {item.category.length > 0 && <Accordion.Body className="px-0">
                            <Accordion>
                                {
                                    item.category.map((cItem, ci) => (
                                        <Accordion.Item key={arrayIndex('acc_c', ci)} eventKey={ci}>
                                            <Accordion.Header>{cItem.category_name}</Accordion.Header>
                                            {cItem.subcategory.length > 0 && <Accordion.Body className="px-0">
                                                <Accordion>
                                                    {
                                                        cItem.subcategory.map((sItem, si) => (
                                                            <div key={arrayIndex('acc_Si', si)}>
                                                                <Badge pill bg="" className={`mx-2 badge-${sItem.method.toLowerCase()}`}> {sItem.method}</Badge>{`${sItem.api_name}`}
                                                            </div>
                                                        ))
                                                    }
                                                </Accordion>
                                            </Accordion.Body>
                                            }
                                        </Accordion.Item>
                                    ))
                                }
                            </Accordion>
                        </Accordion.Body>}
                    </Accordion.Item>)
                    )
                }
            </Accordion>
        </div>
    )
}
Sidebar.propTypes = {
    setPageData: PropTypes.func
}
export default Sidebar
