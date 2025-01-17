import { gql } from "@apollo/client";
import { ARTWORK_BASE_FIELDS, EVENT_BASE_FIELDS, DIGITAL_ARTWORK_BASE_FIELDS, PRODUCT_BASE_FIELDS } from "./fragments";


export const GET_USER = gql`
query getUser($userId: Int!){
  users_by_pk(id: $userId) {
    id
    fullname
    gender
    otp
    phone
    profile_image_url
    updated_at
    email
    date_of_birth
    created_at
    address
  }
}
`

export const GET_ARTWORK = gql`
query getArtwork($artworkMedium: String, $artworkMedium_mm: String) {
  traditional_art_work(where: {disabled: {_eq: false}, pending: {_eq: false},
    _or: [
      {traditional_art_work_artwork_medium_type: {medium_name: {_ilike: $artworkMedium}}},
      {traditional_art_work_artwork_medium_type: {medium_name_mm: {_ilike: $artworkMedium_mm}}}
    ]
  }) {
    artwork_image_url
    id
  }
  digital_art_work(where: {disabled: {_eq: false}, pending: {_eq: false}}) {
    artwork_image_url
    id
    update_price
  }
}
`
export const GET_ARTIST = gql`
query getArtist($artistType: String!, $artistName: String, $artistName_mm: String, $sort: order_by){
  artist(where: {traditional_or_digital_preferred: {_ilike:$artistType}, disabled: {_eq: false},
	_or:[
    {
      artist_name:{_ilike:$artistName},
      artist_name_mm:{_ilike:$artistName_mm}
    }
  ]
  },
  order_by: {artist_name: $sort}) {
    artist_profile_image_url
    artist_name
    artist_name_mm
    id
  }
}

`

export const GET_ARTIST_BY_ID = gql`
query getArtistById($ArtistId: Int!){
  artist_by_pk(id: $ArtistId) {
    artist_profile_image_url
    artist_name
    artist_name_mm
    biography
    biography_mm
    id
    year_born
    year_died

  }
}
`

export const GET_ARTWORK_BY_ID = gql`
query getArtworkById($ArtworkId: Int!){
  traditional_art_work_by_pk(id: $ArtworkId) {
    ...artworkBaseFields
    traditional_art_work_artist_art_series(where: {fk_traditional_art_work_id: {_eq: $ArtworkId}}) {
      artist_art_series_art_sery {
        series_name
        series_name_mm
      }
    }
  }
  digital_art_work_by_pk(id: $ArtworkId) {
   ...digitalArtworkBaseFields
   digital_artist_art_series(where: {fk_digital_artwork_id: {_eq: $ArtworkId}}) {
    digtal_art_sery {
        series_name
        series_name_mm
        series_description_mm
        series_description
      }
    }
  }
  
}
${ARTWORK_BASE_FIELDS},
${DIGITAL_ARTWORK_BASE_FIELDS}
`


export const GET_ARTWORK_BY_ID_FOR_USER = gql`
query getArtworkById($ArtworkId: Int!, $userId: Int!,){

  traditional_art_work_by_pk(id: $ArtworkId) {
    ...artworkBaseFields
    traditional_art_work_user_favourites(where: {fk_user_id: {_eq: $userId}, fk_artwork_id: {_eq: $ArtworkId}}) {
      id
    }
    traditional_art_work_artist_art_series(where: {fk_traditional_art_work_id: {_eq: $ArtworkId}}) {
      artist_art_series_art_sery {
        series_name
        series_name_mm
      }
    }
  }

  digital_art_work_by_pk(id: $ArtworkId) {
   ...digitalArtworkBaseFields
   digital_art_work_user_favourites(where: {fk_digital_artwork_id: {_eq: $ArtworkId}, fk_user_id: {_eq: $userId}}) {
      id
    }
   digital_artist_art_series(where: {fk_digital_artwork_id: {_eq: $ArtworkId}}) {
    digtal_art_sery {
        series_name
        series_name_mm
        series_description_mm
        series_description
      }
    }
  }
}
${ARTWORK_BASE_FIELDS},
${DIGITAL_ARTWORK_BASE_FIELDS}
`

export const GET_ARTWORK_BY_ARTWORK_NAME = gql`
query getArtworkByArtworkName($SearchValue: String!){
  traditional_art_work(where: {
  _or: [
    {artwork_name: {_ilike: $SearchValue}}
    {artwork_name_mm: {_ilike: $SearchValue}}
  ] , pending: {_eq: false} 
  }) {
    artwork_image_url
    artwork_name
    artwork_name_mm
    artwork_year
    current_price
    description_mm
    dimensions
    id
  }
  digital_art_work(where:{
    _or:[
      {artwork_name: {_ilike:$SearchValue}}
      {artwork_name_mm:{_like:$SearchValue}}
    ], pending: {_eq: false}
  }){
    artwork_image_url
    artwork_name
    artwork_name_mm
    artwork_year
    current_price
    description_mm
    id
  }
}
`


export const GET_USER_FAVOURITE = gql`
query getUserFavourite($userId: Int!){
  user_favourites(where: {fk_user_id: {_eq: $userId}}) {
    user_favourites_traditional_art_work {
      artwork_image_url
      id
    }
    user_favourites_digital_art_work {
      artwork_image_url
      id
    }
  }
}
`

export const GET_SERIES_BY_ARTIST_ID = gql`
query getTradiSeriesByArtistId($ArtistId: Int!){
  art_series(where:{
    fk_artist_id: {_eq: $ArtistId}
  }) {
    id 
    series_name
    series_name_mm
    art_series_traditional_art_work{
      artwork_image_url
      artwork_name
      artwork_year
    }
  }
  digtal_art_series(where: {
    fk_artist_id: {_eq: $ArtistId}
    }) {
    id
    series_name_mm
    series_name
    art_series_digital_artwork {
      artwork_image_url
      artwork_name
      artwork_name_mm
      artwork_year
    }
  } 
}
`

export const GET_SERIES_BY_SERIES_NAME = gql`
query getSeriesBySeriesName($SeriesName: String!, $ArtistId: Int!){
  art_series(where: {series_name: {_ilike: $SeriesName}, fk_artist_id: {_eq: $ArtistId}}) {
    series_name
    art_series_traditional_art_work {
      artwork_name
      artwork_name_mm
      artwork_image_url
      artwork_year
      dimensions
      description
      id
    }
  }
  digtal_art_series(where: {series_name: {_ilike: $SeriesName}, 
  fk_artist_id: {_eq: $ArtistId}}) {
    art_series_digital_artwork {
      artwork_image_url
      artwork_name
      artwork_name_mm
      artwork_year
      id
    }
  }
}
`

export const GET_ARTWORK_COLLECTION_BY_ARTIST = gql`
query getArtworkCollectionByArtist($ArtistId: Int!){
  artist_by_pk(id:$ArtistId) {
    artist_name
    artist_name_mm
    id
    artist_traditional_art_works(where: {disabled: {_eq: false}, pending: {_eq: false}, fk_artist_id: {_eq: $ArtistId}}) {
      id
      artwork_name
      artwork_name_mm
      artwork_image_url
      artwork_year
    }
    artist_digital_art_works(where: {disabled: {_eq: false}, pending: {_eq: false}, fk_artist_id: {_eq: $ArtistId}}) {
      artwork_image_url
      artwork_name
      artwork_name_mm
      artwork_year
      id
    }
  }
}
`

export const GET_EVENT = gql`
query getEvent($currDate:timestamp!){
  currentEvent: event(where: {_or: {
  event_start_date: {_lte: $currDate},
   event_end_date: {_gte: $currDate}
   },disabled: {_eq: false}})
     {
    ...eventBaseFields
  }
  upcomingEvent :event(where: {
  event_start_date: {_gt: $currDate},
   disabled: {_eq: false}}){
    ...eventBaseFields
  }
  pastEvent :event(where: {
  event_end_date: {_lt: $currDate}, 
  disabled: {_eq: false}}, order_by: {created_at: desc}) {
    ...eventBaseFields
  }
}
${EVENT_BASE_FIELDS}
`

export const GET_ARTWORK_COLLECTION_BY_RESELLER = gql`
query getArtworkCollectionByReseller{
  collection(where: {
  collection_art_collections: {id: {_is_null: false},
   art_collection_traditional_art_work: {pending: {_eq: false}}}}){
    collection_name
    collection_name_mm
    collection_image_url
    id
  }
  digital_collection(where: {
  digital_collection_digital_art_collections: {id: {_is_null: false},
   digital_art_collection_digital_art_work: {pending: {_eq: false}}}}) {
    collection_name
    collection_name_mm
    id
    collection_image_url
  }
}
`
export const GET_ARTWORK_COLLECTION_BY_ID = gql`
query getArtworkCollectionById($collectionId: Int!){
  collection_by_pk(id: $collectionId) {
    collection_name
    collection_name_mm
    collection_art_collections(where: {fk_collection_id: {_eq: $collectionId},
    art_collection_traditional_art_work: {pending: {_eq: false}}}) {
      art_collection_traditional_art_work {
        artwork_image_url
        artwork_name
        artwork_name_mm
        id
      }
    }
  }
  digital_collection_by_pk(id: $collectionId) {
    collection_name
    collection_name_mm
    digital_collection_digital_art_collections(where: {fk_collection_id: {_eq: $collectionId},
    digital_art_collection_digital_art_work: {pending: {_eq: false}}}) {
      digital_art_collection_digital_art_work {
        artwork_image_url
        artwork_name
        artwork_name_mm
        id
      }
    }
  }
}
`
export const GET_ARTICLE = gql`
 query getArticle($isTraditional: Boolean!,$categoryName: String!, $categoryName_mm: String!) {
  articles(where: {
  pending: {_eq: false},
  is_traditional: {_eq: $isTraditional}, 
    _or:[
      {article_category:{name:{_ilike:$categoryName}}},
      {article_category:{name_mm:{_ilike:$categoryName_mm}}}
    ]},
    order_by: {updated_at: desc}) {
    id
    fk_article_category_id
    duration_time
    description_3_mm
    description_3
    description_2_mm
    description_2
    description_1_mm
    description_1
    image_url
    image_url_1
    image_url_2
    is_traditional
    name
    name_mm
    pending
    updated_at
    created_at
    article_category {
      is_traditional
      name
      name_mm
      id
    }
  }
}
`
export const GET_ARTICLE_BY_ID = gql`
query MyQuery($articleId: Int!) {
  articles_by_pk(id: $articleId) {
    created_at
    description_1
    description_1_mm
    description_2
    description_2_mm
    description_3
    description_3_mm
    duration_time
    id
    image_url
    image_url_1
    image_url_2
    fk_article_category_id
    is_traditional
    name
    name_mm
    updated_at
  }
}

`
export const GET_VIDEO_LIST = gql`
query getVideoList {
  video_list(where: {pending: {_eq: false}}) {
    id
    thumbnail_image_url
    video_name_mm
    video_name
  }
}
`

export const GET_VIDEO_BY_ID = gql`
query getVideoById($videoId: Int!){
  videos_by_pk(id: $videoId) {
    description_en
    description_mm
    disable
    duration_minute
    fk_video_category_id
    fk_video_creator_id
    id
    pending
    thumbnail_image_url
    updated_at
    video_name
    video_name_mm
    video_url
    view_count
    videos_creator {
      image_url
      name
      follow_count
      id
    }
        video_views_aggregate {
      aggregate {
        sum {
          view_count
        }
      }
    }
  }
}
`

export const GET_MEDIUM_TYPE = gql`
query getMediumType {
  artwork_medium_type {
    medium_name
    medium_name_mm
  }
}
`

export const GET_NOTIFICATION = gql`
query getNotification {
  notification_history(order_by: {created_at: desc}) {
    created_at
    updated_at
    notification_data
    notification_image_url
  }
  notification_history_aggregate{
    aggregate{
      count
    }
  }
}
`

export const GET_NOTI_COUNT = gql`
query getNotiCount {
  notification_history_aggregate{
    aggregate{
      count
    }
  }
  }  
`

export const GET_VIDEO = gql`
query getVideo($isTraditional: Boolean!,$categoryName: String, $categoryName_mm: String) {
  videos(where: {is_traditional: {_eq: $isTraditional}, pending: {_eq: false}, disable: {_eq: false}
   _or:[
      {video_category:{name:{_ilike:$categoryName}}},
      {video_category:{name_mm:{_ilike:$categoryName_mm}}}
    ]
  }, order_by: {updated_at: desc}
    ) {
    created_at
    description_en
    description_mm
    disable
    duration_minute
    fk_video_category_id
    fk_video_creator_id
    id
    thumbnail_image_url
    pending
    video_name
    video_name_mm
    video_url
    view_count
    video_category {
      id
      name
      name_mm
      is_traditional
      updated_at
    }
    videos_creator {
      follow_count
      id
      image_url
      name
      name_mm
      is_traditional
    }
       video_views_aggregate {
      aggregate {
        sum {
          view_count
        }
      }
    }
  }
}

`
export const GET_VIDEO_CATEGORY = gql`
query getVideoCategory($isTraditional: Boolean!) {
  video_category(where: {is_traditional: {_eq: $isTraditional}}) {
    name
    name_mm
    is_traditional
    id
  }
}
`
export const GET_VIDEO_CREATER_BY_ID = gql`
query getVideoCreaterById($createrId: Int!) {
  video_creator_by_pk(id: $createrId) {
    follow_count
    id
    image_url
    name
     name_mm
    is_traditional
    creator_videos(where: {pending: {_eq: false}, disable: {_eq: false}}) {
      description_en
      description_mm
      duration_minute
      fk_video_category_id
      fk_video_creator_id
      pending
      thumbnail_image_url
      id
      video_name
      video_name_mm
      video_url
      view_count
       video_views_aggregate {
        aggregate {
          max {
            view_count
          }
        }
      }
    }
        creator_videos_aggregate(where: {pending: {_eq: false}, disable: {_eq: false}}) {
      aggregate {
        count
      }
    }
  }
}
`

export const GET_ARTICLE_CATEGORY = gql`
query getArticleCategory($isTraditional: Boolean!) {
  article_category(order_by: {updated_at: desc}, where: {is_traditional: {_eq: $isTraditional}}) {
    id
    is_traditional
    name
    name_mm
  }
}
`

export const GET_SEARCH_VIDEO = gql`
query getFilteredVideos($search: String!,) {
  videos(where: {_or: [
  {video_name: {_ilike: $search}},
  {video_name_mm: {_ilike: $search}}, 
  {video_category: {name: {_ilike: $search}}}, 
  {video_category: {name_mm: {_ilike: $search}}}, 
  {videos_creator: {name: {_ilike: $search}}}, 
  {videos_creator: {name_mm: {_ilike: $search}}}], 
  pending: {_eq: false}, disable: {_eq: false}, 
  is_traditional: {_eq: false}}) {
    fk_video_category_id
    fk_video_creator_id
    id
    video_name
    video_name_mm
    video_category {
      id
      name
      name_mm
    }
    videos_creator {
      id
      name
      name_mm
    }
  }
}

`

export const GET_CREATOR_FOLLOW = gql`
query getCreatorFollow($isTraditional: Boolean!,$userId: Int!,$videoCreatorId: Int!) {
  video_creator_follow(where: {is_traditional: {_eq: $isTraditional}, fk_user_id: {_eq: $userId}, fk_video_creator_id: {_eq: $videoCreatorId}}) {
    follow_count
    id
    fk_user_id
    fk_video_creator_id
    is_traditional
  }
}
`

export const GET_PRODUCT_CATEGORY = gql`
query getProductCategory {
  product_categories(where: {disabled: {_eq: false}}) {
    title
    image_url
    id
  }
}
`

export const GET_PRODUCT = gql`
query getProduct($where: products_bool_exp!,) {
  products(where: $where) {
    ...productBaseFields
  }
}
${PRODUCT_BASE_FIELDS}
`

export const GET_PRODUCT_ADS = gql`
query getProductAds {
  product_ads{
    id
    product_image_url
    linking_url
    title
  }
}
`


export const GET_PRODUCT_BY_ID = gql`
query getProductById($productId: Int!) {
  products_by_pk(id: $productId) {
   ...productBaseFields
  }
}
${PRODUCT_BASE_FIELDS}
`
export const GET_CART_ITEM = gql`
query getCartItem($userId: Int!) {
   cart_items(order_by: {created_at: desc},
   , where: {user_id: {_eq: $userId}}) {
    quantity
    id
    product_id
    product {
     ...productBaseFields
    }
  }
}
${PRODUCT_BASE_FIELDS}
`
export const GET_CART_ITEM_COUNT = gql`
query getCartItemCount($userId: Int!) {
  cart_items_aggregate(where: {user_id: {_eq: $userId}}) {
    aggregate {
      sum {
        quantity
        user_id
      }
    }
  }
}
`
export const GET_ADDRESS = gql`
query getAddress($userId: Int!) {
  address(where: {fk_user_id: {_eq: $userId}}, order_by: {created_at: desc}) {
    id
    name
    phone
    address
  }
}
`
export const GET_BANKING_TYPE = gql`
query getBankingType {
  payments {
    account_number
    id
    information
    payment_logo_url
    payment_service_name
    qr_image_url
    receiver_name
    created_at
  }
}
`
export const GET_ACTIVE_ORDER = gql`
query getOrders($userId: Int!) {
  orders(where: {user_id: {_eq: $userId}, 
  _and: [{order_status: {_nilike: "%complete%"}}, 
         {order_status: {_nilike: "%reject%"}}]}, 
         order_by: {updated_at: desc}) {
    id
    order_number
    order_status
    payment_screenshot_image_url
    total_price
    total_quantity
    updated_at
    created_at
     order_items {
      unit_price
      total
      quantity
      product_id
      order_id
        product {
        product_image_url
        title
      }
    }
  }
}
`

export const GET_ORDER_BY_STATUS = gql`
query getOrders($userId: Int!, $status: String!) {
  orders (
  where: {
  user_id: {_eq: $userId}
  order_status: {_ilike: $status}
  }
  order_by: {updated_at: desc}
  ) {
    id
    order_status
    payment_screenshot_image_url
    total_price
    total_quantity
    updated_at
    order_number
    created_at
    order_items {
      unit_price
      total
      quantity
      id
        product {
        product_image_url
        title
      }
    }
  }
}
`

export const GET_ORDER_BY_ID = gql`
query getOrderById($orderId: String!) {
  orders(where: {
    order_number: {_eq: $orderId}
  })
  {
    id
    order_status
    payment_screenshot_image_url
    total_price
    total_quantity
    payment_method
    payment_service_name
    payment_receiver_name
    payment_receiver_account_number
    updated_at
    created_at
    order_number
    order_items {
      unit_price
      total
      quantity
      id
   product {
        product_image_url
        title
      }

    }
  }
}
`



















