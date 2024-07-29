const request = uni.$u.http

// 司机&供应商-我的调度单
export const GetMyDispatchList = (params, config = {}) => request.post('/api/WayBill/GetMyDispatchList', params, config)

// 司机&供应商-我的调度单详情
export const MyDispatchBillDetail = (params, config = {}) => request.post('/api/MyDispatchBillDetail', params, config)


// 司机&供应商--上报调度单位置
export const SetDispatchStatusPosition = (params, config = {}) => request.post('/api/SetDispatchStatusPosition', params, config)

