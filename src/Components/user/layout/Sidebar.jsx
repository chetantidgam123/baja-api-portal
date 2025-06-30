import { Accordion } from "react-bootstrap"
import { arrayIndex, sidebardata } from "../../../Utils"

function Sidebar() {
    return (
        <div className="sidebar bg-white">
            <Accordion>
                {
                    sidebardata.map((item, i) =>
                    (<Accordion.Item key={arrayIndex('acc', i)} eventKey={i}>
                        <Accordion.Header>{item.collection_name}</Accordion.Header>
                        {item.category.length > 0 && <Accordion.Body className="px-0">
                            <Accordion>
                                {

                                    item.category.map((cItem, ci) => (
                                        <Accordion.Item key={arrayIndex('acc_c', ci)} eventKey="0">
                                            <Accordion.Header>{cItem.category_name}</Accordion.Header>
                                            {cItem.subcategory.length > 0 && <Accordion.Body className="px-0">
                                                <Accordion>
                                                    {
                                                        cItem.subcategory.map((sItem, si) => (
                                                            <div key={arrayIndex('acc_Si', si)}>
                                                                {`${sItem.method} ${sItem.category_name}`}
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

export default Sidebar
