import { gql } from "@apollo/client";


export const REQUEST_OTP = gql`
mutation requestOTP($phone: String!){
    requestOTP(phone: $phone) {
      error
      message
    }
  }
`

export const REQUEST_OTP_FOR_FORGOTPASS = gql`
mutation requestOtpForForgotpass($phone: String!){
  forgetPassword(phone:$phone) {
    error
    message
  }
}
`

export const CHECK_OTP = gql`
mutation checkOTP($otp: String!, $phone: String!){
  checkOTP(otp: $otp, phone: $phone) {
    error
    message
  }
}
`

export const CREATE_USER = gql`
mutation createUser($dob: String!, $fullname: String!, $gender: String!, $otp: String!, $password: String!, $phone: String!, ){
  SignUp(dob: $dob, fullname: $fullname, gender: $gender, otp: $otp, password: $password, phone: $phone, ) {
    error
    message
  }
}
`
export const RESET_PASSWORD = gql`
mutation resetPassword($newPassword: String!, $otp: String!, $phone: String!){
  resetPassword(newPassword: $newPassword, otp: $otp, phone: $phone) {
    error
    message
  }
}
`

export const CHANGE_PASSWORD = gql`
mutation changePassword($newPassword: String!, $oldPassword: String!, $phone: String!){
  changePassword(newPassword: $newPassword, oldPassword: $oldPassword, phone: $phone) {
    error
    message
  }
}
`

export const AUTHENICATE = gql`
mutation authorize($password: String!, $phone: String!){
  Login(password: $password, phone: $phone) {
    accessToken
    error
    message
  }
}
`
export const ADD_FAVOURITE = gql`
mutation addFavourite($ArtworkId: Int, $userId: Int!,$DigitalArtworkId: Int){
  insert_user_favourites(objects: {fk_artwork_id: $ArtworkId, fk_user_id: $userId,fk_digital_artwork_id: $DigitalArtworkId}) {
    affected_rows
  }
}
`

export const DELETE_FAVOURITE = gql`
mutation deleteFavourite($favoriteId: Int!){
  delete_user_favourites_by_pk(id: $favoriteId) {
    fk_artwork_id
  }
}
`

export const DISABLE_USER = gql`
mutation disableUser($userId: Int!){
  update_users_by_pk(pk_columns: {id: $userId}, _set: {disabled: true}) {
    id
  }
}
`

export const GET_IMAGE_UPLOAD_URL = gql`
mutation getImageUploadUrl{
  getImageUploadUrl(contentType: "String") {
    contentType
    error
    imageName
    imageUploadUrl
    message
  }
}
`
export const UPDATE_USER_IMAGE = gql`
mutation updateUserImgae($userId:Int!,$profile_image_url: String!){
  update_users_by_pk(pk_columns: {id: $userId}, _set: {profile_image_url: $profile_image_url}) {
    profile_image_url
  }
}
`

export const ADD_FEEDBACK = gql`
mutation addFeedback($userId: Int!, $subject: String!, $message: String!) {
  insert_feedback(objects: {fk_user_id: $userId, message: $message, subject: $subject,}) {
    affected_rows
  }
}
`

export const VIDEO_CREATOR_FOLLOW = gql`
mutation videoCaretorFollow($userId: Int!,$videoCreatorId: Int!, $isTraditional: Boolean!) {
  VideoCreatorFollowCount(fk_user_id: $userId, fk_video_creator_id: $videoCreatorId, is_traditional: $isTraditional) {
    error
    message
  }
}
`

export const VIDEO_CREATOR_UNFOLLOW = gql`
mutation videoCreatorUnfollow($userId: Int!,$videoCreatorId: Int!, $isTraditional: Boolean!) {
  VideoCreatorUnFollowCount(fk_user_id: $userId, fk_video_creator_id: $videoCreatorId, is_traditional: $isTraditional) {
    error
    message
  }
}
`

export const VIDEO_VIEW_COUNT = gql`
mutation videoViewCount($userId: Int!,$videoId: Int!,$isTraditional: Boolean!,$duration: Int!){
   VideoViewCount(fk_user_id: $userId, fk_video_id: $videoId, is_traditional: $isTraditional, watch_duration: $duration) {
    error
    message
  }
}
`

export const ADD_CART_ITEM = gql`
mutation addCartItem($productId: Int!,$quantity: Int!,$userId: Int!,) {
   AddCartItem(product_id: $productId , quantity: $quantity, user_id: $userId) {
    message
  }
}
`

export const UPDATE_CART_ITEM = gql`
mutation updateCartItem($cartItemId: Int!,$quantity: Int!) {
  update_cart_items_by_pk(pk_columns: {id: $cartItemId}, _set: {quantity: $quantity}) {
    product_id
  }
}
`
export const DELETE_CART_ITEM = gql`
mutation deleteCartItem($cartItemId: Int!) {
  delete_cart_items_by_pk(id: $cartItemId) {
    id
  }
}
`
export const CREATE_ADDRESS = gql`
mutation createAddress($userId: Int!,$name: String!, $phone: String!, $address: String!) {
  insert_address(objects: {fk_user_id: $userId, name: $name, phone: $phone, address: $address}) {
    returning {
      id
    }
  }
}
`
export const UPDATE_DEFAULT_ADDRESS = gql`
mutation updateDefaultAddress($userId: Int!, $address: String!) {
  update_users_by_pk(pk_columns: {id: $userId}, _set: {address: $address}) {
    id
  }
}
`;

export const CREATE_ORDER = gql`
mutation createOrder($paymentImageUrl: String, $paymentMethod: String!, $paymentReceiverAccountNumber: String, $paymentReceiverName: String, $paymentServiceName: String,$receiverAddress: String!,$receiverName: String!, $receiverPhone: String!,$userId: Int!) {
 AddOrder(image_url: $paymentImageUrl, payment_method: $paymentMethod, payment_receiver_account_number: $paymentReceiverAccountNumber, payment_receiver_name: $paymentReceiverName, payment_service_name: $paymentServiceName, receiver_address: $receiverAddress, receiver_name: $receiverName, receiver_phone: $receiverPhone, user_id: $userId) {
    message
  }
}
`;
