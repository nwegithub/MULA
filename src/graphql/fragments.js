import { gql} from "@apollo/client";


export const ARTWORK_BASE_FIELDS = gql`
fragment artworkBaseFields on traditional_art_work {
    artwork_image_url
    artwork_name
    artwork_year
    current_price
    description
    dimensions
    width
    height
    artwork_name_mm
    description_mm
    sold_out_date
    buyer
    pending
    traditional_art_work_artist {
      artist_name
      artist_name_mm
      id
    }
    traditional_art_work_artwork_medium_type {
      medium_name
      medium_name_mm
    }
    traditional_artwork_dimension {
      dimension_name
    }
    traditional_art_work_artwork_price_unit {
      price_unit
    }
}
`;


export const EVENT_BASE_FIELDS = gql`
fragment eventBaseFields on event {
    event_description
    event_description_mm
    event_location
    event_location_mm
    event_name
    event_name_mm
    event_thumbnail_url
    id
    fk_admin_id
    event_start_time
    event_end_date
    event_start_date
    event_end_time
}
`
export const DIGITAL_ARTWORK_BASE_FIELDS = gql`
fragment digitalArtworkBaseFields on digital_art_work{
  artwork_image_url
    artwork_name
    artwork_name_mm
    artwork_year
    created_at
    current_price
    sold_out_date
    buyer
    description
    update_price
    id
    updated_at
    pending
    disabled
    fk_artist_id
    description_mm
    digital_art_work_artist {
      id
      artist_name_mm
      artist_name
    }
}
`

export const PRODUCT_BASE_FIELDS = gql`
fragment productBaseFields on products {
    brand_id
    description_html
    disabled
    id
    price
    product_image_url
    serial_number
    title
      product_category {
      image_url
      id
      title
    }
      product_medias {
      product {
        description_html
        price
        id
        product_image_url
        title
      }
      media_url
      media_type
    }
}
`;
