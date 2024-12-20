
const ThemeOptionSubmit = (values, mutate) => {
    if (values["header_logo_id"]) {
        values['options']['logo']["header_logo_id"] = values["header_logo_id"]
    }
    if (values["footer_logo_id"]) {
        values['options']['logo']["footer_logo_id"] = values["footer_logo_id"]
    }
    if (values["favicon_icon_id"]) {
        values['options']['logo']["favicon_icon_id"] = values["favicon_icon_id"]
    }
    if (values["og_image_id"]) {
        values['options']['seo']["og_image_id"] = values["og_image_id"]
    }
    if (values["headerCategories"]) {
        values['options']['header']["category_ids"] = values["headerCategories"]
    }
    if (values["footer_categories"]) {
        values['options']['footer']["footer_categories"] = values["footer_categories"]
    }
    if (values["useful_link"]) {
        values['options']['footer']["useful_link"] = values["useful_link"]
    }
    if (values["today_deals"]) {
        values['options']['header']["today_deals"] = values["today_deals"]
    }
    if (values["footer_pages"]) {
        values['options']['footer']["footer_pages"] = values["footer_pages"]
    }

    if (values['serviceImage1']) {
        values['options']['seller']['services']['service_1']['image_url'] = values['serviceImage1'].original_url
    } else values['options']['seller']['services']['service_1']['image_url'] = ''

    if (values['serviceImage2']) {
        values['options']['seller']['services']['service_2']['image_url'] = values['serviceImage2'].original_url
    } else values['options']['seller']['services']['service_2']['image_url'] = ''

    if (values['serviceImage3']) {
        values['options']['seller']['services']['service_3']['image_url'] = values['serviceImage3'].original_url
    } else values['options']['seller']['services']['service_3']['image_url'] = ''

    if (values['serviceImage4']) {
        values['options']['seller']['services']['service_4']['image_url'] = values['serviceImage4'].original_url
    } else values['options']['seller']['services']['service_4']['image_url'] = ''

    if (values['aboutSellerImage']) {
        values['options']['seller']['about']['image_url'] = values['aboutSellerImage'].original_url
    } else values['options']['seller']['about']['image_url'] = ''

    if (values['contactUsImage']) {
        values['options']['contact_us']['imageUrl'] = values['contactUsImage'].original_url
    } else values['options']['contact_us']['imageUrl'] = ''

    if (values['collection_banner_image']) {
        values['options']['collection']['collection_banner_image_url'] = values['collection_banner_image'].original_url
    } else values['options']['collection']['collection_banner_image_url'] = ''

    if (values['banner_image_url']) {
        values['options']['product']['banner_image_url'] = values['banner_image_url'].original_url
    } else values['options']['product']['banner_image_url'] = ''

    if (values['safe_checkout_image']) {
        values['options']['product']['safe_checkout_image'] = values['safe_checkout_image'].original_url
    } else values['options']['product']['safe_checkout_image'] = ''

    if (values['secure_checkout_image']) {
        values['options']['product']['secure_checkout_image'] = values['secure_checkout_image'].original_url
    } else values['options']['product']['secure_checkout_image'] = ''

    // About Us
    if (values['content_left_image_url']) {
        values['options']['about_us']['about']['content_left_image_url'] = values['content_left_image_url'].original_url
    } else values['options']['about_us']['about']['content_left_image_url'] = ''

    if (values['content_right_image_url']) {
        values['options']['about_us']['about']['content_right_image_url'] = values['content_right_image_url'].original_url
    } else values['options']['about_us']['about']['content_right_image_url'] = ''

    if (values['aboutUsBlog']) {
        values['options']['about_us']['blog']['blog_ids'] = values['aboutUsBlog']
    }

    values['options']['about_us']['about']['futures']?.forEach((elem, i) => {
        if (values[`futureIcons${i}`]) {
            values['options']['about_us']['about']['futures'][i]['icon'] = values[`futureIcons${i}`].original_url
        } else { values['options']['about_us']['about']['futures'][i]['icon'] = '' }
    })

    values['options']['about_us']['clients']['content']?.forEach((elem, i) => {
        if (values[`clientContentImage${i}`]) {
            values['options']['about_us']['clients']['content'][i]['icon'] = values[`clientContentImage${i}`].original_url
        } else { values['options']['about_us']['clients']['content'][i]['icon'] = '' }
    })

    values['options']['about_us']['team']['members']?.forEach((elem, i) => {
        if (values[`teamContentImage${i}`]) {
            values['options']['about_us']['team']['members'][i]['profile_image_url'] = values[`teamContentImage${i}`].original_url
        } else { values['options']['about_us']['team']['members'][i]['profile_image_url'] = '' }
    })

    values['options']['about_us']['testimonial']['reviews']?.forEach((elem, i) => {
        if (values[`testimonialReviewImage${i}`]) {
            values['options']['about_us']['testimonial']['reviews'][i]['profile_image_url'] = values[`testimonialReviewImage${i}`].original_url
        } else { values['options']['about_us']['testimonial']['reviews'][i]['profile_image_url'] = '' }
    })

    if (values['banner_home']) {
        const data = {
            homepage: {
                banner_home: values['banner_home']
            }
        }
        values['options'] = { ...values['options'], ...data };
    } else {
        values['options']['homepage']["banner_home"] = '';
    }

    if (values['titlesec3']) {
        const data = {
            homepage: {
                ...values['options']['homepage'],
                titlesec3: values['titlesec3']
            }
        }
        values['options'] = { ...values['options'], ...data };
    } else {
        values['options']['homepage']["titlesec3"] = '';
    }

    if (values['tagline']) {
        const data = {
            homepage: {
                ...values['options']['homepage'],
                tagline: values['tagline']
            }
        }
        values['options'] = { ...values['options'], ...data };
    } else {
        values['options']['homepage']["tagline"] = '';
    }

    if (values['tagline2']) {
        const data = {
            homepage: {
                ...values['options']['homepage'],
                tagline2: values['tagline2']
            }
        }
        values['options'] = { ...values['options'], ...data };
    } else {
        values['options']['homepage']["tagline2"] = '';
    }

    if (values['video']) {
        const data = {
            homepage: {
                ...values['options']['homepage'],
                video: values['video']
            }
        }
        values['options'] = { ...values['options'], ...data };
    } else {
        values['options']['homepage']["video"] = '';
    }

    if (values['title_req']) {
        const data = {
            homepage: {
                ...values['options']['homepage'],
                title_req: values['title_req']
            }
        }
        values['options'] = { ...values['options'], ...data };
    } else {
        values['options']['homepage']["title_req"] = '';
    }

    if (values['tagline_req']) {
        const data = {
            homepage: {
                ...values['options']['homepage'],
                tagline_req: values['tagline_req']
            }
        }
        values['options'] = { ...values['options'], ...data };
    } else {
        values['options']['homepage']["tagline_req"] = '';
    }

    if (values['require_img']) {
        const data = {
            homepage: {
                ...values['options']['homepage'],
                require_img: values['require_img']
            }
        }
        values['options'] = { ...values['options'], ...data };
    } else {
        values['options']['homepage']["require_img"] = '';
    }

    if (values['require_img2']) {
        const data = {
            homepage: {
                ...values['options']['homepage'],
                require_img2: values['require_img2']
            }
        }
        values['options'] = { ...values['options'], ...data };
    } else {
        values['options']['homepage']["require_img2"] = '';
    }

    if (values['bottom_banner']) {
        const data = {
            homepage: {
                ...values['options']['homepage'],
                bottom_banner: values['bottom_banner']
            }
        }
        values['options'] = { ...values['options'], ...data };
    } else {
        values['options']['homepage']["bottom_banner"] = '';
    }

    if (values['require_img3']) {
        const data = {
            homepage: {
                ...values['options']['homepage'],
                require_img3: values['require_img3']
            }
        }
        values['options'] = { ...values['options'], ...data };
    } else {
        values['options']['homepage']["require_img3"] = '';
    }

    if (values['require_img4']) {
        const data = {
            homepage: {
                ...values['options']['homepage'],
                require_img4: values['require_img4']
            }
        }
        values['options'] = { ...values['options'], ...data };
    } else {
        values['options']['homepage']["require_img4"] = '';
    }

    values["_method"] = "put";
    mutate(values);
}

export default ThemeOptionSubmit