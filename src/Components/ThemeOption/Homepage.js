import React from 'react';
import FileUploadField from '../InputFields/FileUploadField';
import { Col, Row } from 'reactstrap';
import { getHelperText } from '@/Utils/CustomFunctions/getHelperText';
import SimpleInputField from '../InputFields/SimpleInputField';
import { Divider } from '@mui/material';

const Homepage = ({ values, setFieldValue, errors }) => {
    return (
        <>
            <Row>
                <Col sm="9">
                    <FileUploadField
                        name="banner_home"
                        title={"Homepage banner"}
                        errors={errors}
                        id="banner_home"
                        type="file"
                        values={values}
                        setFieldValue={setFieldValue}
                        helpertext={getHelperText('1920x900')} />

                    <h2>Section 3</h2>
                    <Divider sx={{marginTop: 2, marginBottom: 2}}/>
                    <SimpleInputField
                        nameList={[
                        { name: 'titlesec3', type: 'text', title: 'TitleSec3', placeholder: "Title" },
                        { name: 'tagline', type: 'textarea', title: 'Tagline', placeholder: "Tagline" },
                        { name: 'tagline2', title: 'tagline2', placeholder: "Tagline2" },
                        { name: 'video', title: 'video', placeholder: "Video" }
                    ]}
                    />
                    <h2>Requirements Section</h2>
                    <Divider sx={{marginTop: 2, marginBottom: 2}}/>
                    <SimpleInputField
                        nameList={[
                        { name: 'title_req', type: 'text', title: 'Title', placeholder: "Title" },
                        { name: 'tagline_req', type: 'textarea', title: 'Tagline', placeholder: "Tagline" },
                    ]} />

                    <FileUploadField
                        name="require_img"
                        title={"Image 1"}
                        errors={errors}
                        id="require_img"
                        type="file"
                        values={values}
                        setFieldValue={setFieldValue}
                        helpertext={getHelperText('558x196')}
                    />

                    <FileUploadField
                        name="require_img2"
                        title={"Image 2"}
                        errors={errors}
                        id="require_img2"
                        type="file"
                        values={values}
                        setFieldValue={setFieldValue}
                        helpertext={getHelperText('611x459')}
                    />
                    <h2>Bottom Banner</h2>
                    <Divider sx={{marginTop: 2, marginBottom: 2}}/>
                    <FileUploadField
                        name="bottom_banner"
                        title={"Bottom banner"}
                        errors={errors}
                        id="bottom_banner"
                        type="file"
                        values={values}
                        setFieldValue={setFieldValue}
                        helpertext={getHelperText('1920x900')} />

                    <h2>Single Unit Sidebar</h2>
                    <Divider sx={{marginTop: 2, marginBottom: 2}}/>
                    <FileUploadField
                        name="require_img3"
                        title={"Image 3"}
                        errors={errors}
                        id="require_img3"
                        type="file"
                        values={values}
                        setFieldValue={setFieldValue}
                        helpertext={getHelperText('611x459')}
                    />
                    <FileUploadField
                        name="require_img4"
                        title={"Image 4"}
                        errors={errors}
                        id="require_img4"
                        type="file"
                        values={values}
                        setFieldValue={setFieldValue}
                        helpertext={getHelperText('611x459')}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Homepage;