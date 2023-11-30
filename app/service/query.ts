import { gql } from "@apollo/client";

export const getAllCategories = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
      image
      isActive
      defaultRoute
      productTypes {
        id
        name
        defaultRoute
      }
    }
  }
`;

export const getAllCategoryProducts = gql`
  query GetAllCategoryWithProductTypes {
    getAllCategoryWithProductTypes {
      id
      name
      image
      isActive
      products {
        id
        name
        productCode
        shortDescription
        description {
          key
          value
        }
        variant {
          id
          size
          unit
          values
          price
          stock
          ProductInventory {
            id
            productId
            branchId
            variantId
            availableStock
            minimumAvailableStock
          }
        }
        tag
        image {
          id
          image
        }
        rating
        dicountType
        dicountPercentage
        ratingCount
        isActive
        ProductType {
          id
          name
          image
          isActive
          productCategory {
            id
            name
            image
            isActive
            productTypes {
              id
              name
              image
              isActive
              productCategoryId
            }
          }
          productCategoryId
          products {
            id
            name
            productCode
            shortDescription
            tag
            rating
            dicountType
            dicountPercentage
            ratingCount
            isActive
            productTypeId
          }
        }
        productTypeId
      }
    }
  }
`;

export const GetAddToCarts = gql`
  query GetAddToCartsByUserId($userId: ID!) {
    getAddToCartsByUserId(userId: $userId) {
      carts {
        id
        product {
          id
          name
          image {
            id
            image
          }
          dicountType
          dicountPercentage
        }
        quantity
        totalPrice
        selectedVariantId
        selectedVariant {
          id
          size
          unit
          values
          price
          stock
        }
      }
      subTotal
    }
  }
`;

export const AllProductsWithSearch = gql`
  query GetAllProducts($filter: String) {
    getAllProducts(filter: $filter) {
      id
      name
      productCode
      shortDescription
      description {
        key
        value
      }
      variant {
        id
        size
        unit
        values
        price
        stock
        ProductInventory {
          id
          productId
          branchId
          variantId
          availableStock
          minimumAvailableStock
        }
        AddToCart {
          id
          product {
            id
          }
          selectedVariant {
            id
          }
          quantity
          user {
            id
          }
        }
      }
      tag
      image {
        id
        image
      }
      rating
      dicountType
      dicountPercentage
      ratingCount
      isActive
      ProductType {
        id
        name
        image
        isActive
        productCategory {
          id
          name
          image
          isActive
          productTypes {
            id
            name
            image
            isActive
            productCategoryId
          }
        }
        productCategoryId
        products {
          id
          name
          productCode
          shortDescription
          tag
          rating
          dicountType
          dicountPercentage
          ratingCount
          isActive
          productTypeId
        }
      }
      productTypeId
    }
  }
`;

export const AllProductTypeBanner = gql`
  query GetAllBanner {
    getAllBanner {
      id
      title
      description
      image
      ProductType {
        id
        name
        isActive
        defaultRoute
        productCategory {
          id
          name
        }
      }
    }
  }
`;

export const AddToCart = gql`
  mutation addToCartProduct($input: addToCartInput!) {
    addToCartProduct(input: $input) {
      id
      product {
        id
        name
        image {
          id
          image
        }
      }
      productId
      quantity
      totalPrice
      user {
        id
        firstName
      }
      userId
      deviceToken
      isOrder
      selectedVariantId
      selectedVariant {
        id
        size
        unit
        values
        price
      }
    }
  }
`;

export const updateAddToCart = gql`
  mutation Mutation($input: updateAddToCartInput) {
    updateAddToCart(input: $input) {
      id
      product {
        id
        name
        productCode
        shortDescription
        description {
          key
          value
        }
        variant {
          id
          size
          unit
          values
          price
          stock
        }
        tag
        image {
          id
          image
        }
        rating
        dicountType
        dicountPercentage
        ratingCount
        isActive
        ProductType {
          id
          name
          image
          isActive
          productCategory {
            id
            name
            image
            isActive
            productTypes {
              id
              name
              image
              isActive
              productCategoryId
            }
          }
          productCategoryId
          products {
            id
            name
            productCode
            shortDescription
            tag
            rating
            dicountType
            dicountPercentage
            ratingCount
            isActive
            productTypeId
          }
        }
        productTypeId
      }
      productId
      quantity
      totalPrice
      user {
        id
        email
        phoneNo
        firstName
        lastName
        role
        profileImage
        isActive
        Address {
          id
          address
          apartment
          label
          userId
          pincode
        }
      }
      userId
      deviceToken
      isOrder
      selectedVariantId
      selectedVariant {
        id
        size
        unit
        values
        price
        stock
        ProductInventory {
          id
          productId
          branchId
          variantId
          availableStock
          minimumAvailableStock
        }
        AddToCart {
          id
          product {
            id
          }
          selectedVariant {
            id
          }
          quantity
          user {
            id
          }
        }
      }
    }
  }
`;

export const GetCategoryProducts = gql`
  query GetCategoryWithProductTypes($getCategoryWithProductTypesId: ID!) {
    getCategoryWithProductTypes(id: $getCategoryWithProductTypesId) {
      id
      name
      image
      isActive
      products {
        id
        name
        productCode
        variant {
          id
          size
          unit
          values
          price
          stock
          ProductInventory {
            id
            productId
            branchId
            variantId
            availableStock
            minimumAvailableStock
          }
          AddToCart {
            id
            product {
              id
            }
            selectedVariant {
              id
            }
            quantity
            user {
              id
            }
          }
        }
        tag
        image {
          id
          image
        }
        dicountType
        dicountPercentage
        isActive
      }
    }
  }
`;

export const GetProductTypeProducts = gql`
  query GetProductTypeId($getProductTypeId: ID!, $filter: SortProducts) {
    getProductTypeId(id: $getProductTypeId, filter: $filter) {
      id
      name
      image
      isActive
      products {
        id
        name
        productCode
        variant {
          id
          size
          unit
          values
          price
          stock
          ProductInventory {
            id
            productId
            branchId
            variantId
            availableStock
          }
          AddToCart {
            id
            product {
              id
            }
            selectedVariant {
              id
            }
            quantity
            user {
              id
            }
          }
        }
        tag
        image {
          id
          image
        }
        dicountType
        dicountPercentage
      }
    }
  }
`;

export const CategoryProductTypeList = gql`
  query getCategory($getCategoryId: ID!) {
    getCategory(id: $getCategoryId) {
      id
      name
      image
      isActive
      productTypes {
        id
        name
        image
        isActive
      }
    }
  }
`;

export const LoginViaPhone = gql`
  mutation LoginViaPhone($phoneNo: String!) {
    loginViaPhone(phoneNo: $phoneNo) {
      message
      otp
    }
  }
`;

export const OtpValidationForPhone = gql`
  mutation LoginPhoneNoOtpValidation($phoneNo: String!, $otp: String!) {
    loginPhoneNoOtpValidation(phoneNo: $phoneNo, otp: $otp) {
      message
      data {
        id
        email
        phoneNo
        firstName
        lastName
        role
        profileImage
        isActive
      }
      accessToken
      refreshToken
    }
  }
`;

export const getProductVariant = gql`
  query Query($getProductVariantId: ID!) {
    getProductVariant(id: $getProductVariantId) {
      id
      size
      unit
      values
      price
      stock
      product {
        id
      }
    }
  }
`;

//subsc

