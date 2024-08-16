import { Setting, Location, Document, Bell, Menu,
   Edit, HomeFilled, Postcard, Calendar, Magnet,
   List } from '@element-plus/icons';

export const iconMap = {
  "setting": Setting,
  "document": Document,
  "location": Location,
  "bell": Bell,
  "menu": Menu,
  "edit": Edit,
  "magnet": Magnet,
  "homeFilled": HomeFilled,
  "postcard": Postcard,
  "calendar": Calendar,
  "list": List
};
export default {
  install(app) {
    app.config.globalProperties.$iconMap = iconMap;
  }
};