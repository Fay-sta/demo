import request from '@/utils/request'

// 获取导航条
export function getNavsList(){
    return request({
        url:'/mock/nav',
        method:'get'
    })
}

// 获取视频列表
export function getVideosList(navId,navItemId){
    return request({
        url:`/mock/video?navId=${navId}&navItemId=${navItemId}`,
        method:'get'
    })
}
