import moment from 'moment';

import { IMAGE_DEFAULT, ORDER_STATUS } from 'config/constants';
import { ProductCategoryModel } from 'models/product/ProductCategoryModel';
import { ProductImageModel } from 'models/product/ProductModel';

export const formatShortDescription = (text: string, totalWord: number) => {
  let textSize = text?.length;
  if (textSize <= totalWord) {
    return text;
  }
  return text?.slice(0, totalWord) + '...';
};

export const slug = (title: string) => {
  let slug = title.toLowerCase();

  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');

  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\"|\"|\:|\;|_/gi,
    ''
  );

  slug = slug.replace(/ /gi, '-');

  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');

  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
};

export const getThumbnailProduct = (list_image: string) => {
  const images: ProductImageModel[] = JSON.parse(list_image || '[]') || [];
  if (!!images.length) {
    return images[0].url;
  }

  return IMAGE_DEFAULT;
};

export const formatNumber = (number: any) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatMoney = (number: any) => {
  return `${formatNumber(number)} đ`;
};

export const getFullName = (first_name: string, last_name: string) => {
  let full_name = '';
  if (last_name) {
    full_name += `${last_name} `;
  }
  if (first_name) {
    full_name += first_name;
  }

  return full_name || '_ _ _';
};

export const isEmptyObject = (object: any) => {
  return Object.keys(object).length === 0;
};

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const convertLinkToId = (link: string) => {
  if (typeof link === 'string') {
    const id = Number(link.slice(link.lastIndexOf('-') + 1, link.length) || -1);
    return id;
  }
  return -1;
};

export const mappingProductCategory = (
  category_id: any,
  categories: ProductCategoryModel[]
) => {
  const indexMapping = categories.findIndex(
    (category) => category.id === category_id
  );
  return indexMapping > -1 ? categories[indexMapping] : null;
};

export const getTimeAgo = (created_at: string) => {
  let timeOld: number = new Date(created_at).getTime();
  let timeNow: number = new Date().getTime();
  let timeAgo: number = Number.parseInt(
    ((timeNow - timeOld) / (60 * 1000)).toString()
  );
  let timeFormat: string = '';

  if (timeAgo === 0) {
    timeFormat = 'Vừa xong';
  } else if (timeAgo < 60) {
    timeFormat = timeAgo + ' phút trước';
  } else if (timeAgo < 60 * 24) {
    timeFormat = Number.parseInt((timeAgo / 60).toString()) + ' giờ trước';
  } else {
    timeFormat =
      Number.parseInt((timeAgo / (60 * 24)).toString()) + ' ngày trước';
  }
  return timeFormat;
};

export const checkNewProduct = (created_at: string) => {
  let timeOld: number = new Date(created_at).getTime();
  let timeNow: number = new Date().getTime();
  let timeAgo: number = Number.parseInt(
    ((timeNow - timeOld) / (60 * 60 * 24 * 1000)).toString()
  );
  return timeAgo <= 7;
};

export const checkDiscount = (
  price: number,
  promotion_price: number,
  promotion_start: string,
  promotion_end: string
) => {
  if (promotion_price) {
    if (price < promotion_price) {
      return null;
    }
    let timeStart: number = new Date(promotion_start).getTime();
    let timeEnd: number = new Date(promotion_end).getTime();
    let timeNow: number = new Date().getTime();
    if (timeNow >= timeStart && timeNow <= timeEnd) {
      let percentDiscount = ((price - promotion_price) * 100) / price;
      return percentDiscount.toFixed(0);
    }
  }
  return null;
};

export const isDiscount = (
  price: number,
  promotion_price: number,
  promotion_start: string,
  promotion_end: string
) => {
  if (promotion_price) {
    if (price < promotion_price) return false;
    let timeStart: number = new Date(promotion_start).getTime();
    let timeEnd: number = new Date(promotion_end).getTime();
    let timeNow: number = new Date().getTime();
    if (timeNow >= timeStart && timeNow <= timeEnd) {
      return true;
    }
  }
  return false;
};

export const getBase64Image = (event: any) => {
  let result = {
    file_name: '',
    base64: '',
    size: 0,
  };
  let file: any = null;
  file = event.target.files[0];

  return new Promise((resolve, reject) => {
    if (file === null) reject('No Image');
    result.file_name = file.name;
    result.size = file.size;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      result.base64 = e.target.result;
      resolve(result);
    };
  });
};

export const convertDate = (time: string) => {
  if (!time) return '';
  let utc = moment(time).format('DD/MM/YYYY');
  return utc;
};

export const convertDateTime = (time: string) => {
  if (!time) return '';
  let utc = moment(time).format('HH:mm DD/MM/YYYY');
  return utc;
};

export const getStatusName = (status_code: string): string => {
  let status_name = '';
  switch (status_code) {
    case ORDER_STATUS.WAIT_CONFIRM.CODE:
      status_name = ORDER_STATUS.WAIT_CONFIRM.NAME;
      break;
    case ORDER_STATUS.CANCEL.CODE:
      status_name = ORDER_STATUS.CANCEL.NAME;
      break;
    case ORDER_STATUS.CONFIRM.CODE:
      status_name = ORDER_STATUS.CONFIRM.NAME;
      break;
    case ORDER_STATUS.DELIVERY.CODE:
      status_name = ORDER_STATUS.DELIVERY.NAME;
      break;
    case ORDER_STATUS.SUCCESSFUL_DELIVERY.CODE:
      status_name = ORDER_STATUS.SUCCESSFUL_DELIVERY.NAME;
      break;
    default:
      status_name = '';
  }
  return status_name;
};
