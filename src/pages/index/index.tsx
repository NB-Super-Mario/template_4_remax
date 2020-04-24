import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'remax/wechat';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@vant/weapp/dist/dialog';
import DToast from '@vant/weapp/dist/toast';
import Toast from '@vant/weapp/dist/toast/toast';
import Button from '@vant/weapp/dist/button';
import Icon from '@vant/weapp/dist/icon';
import { test } from '@/util/index';
import { TodoProps } from '@/interface/index';
import { toggleTodo, asyncAdd } from '@/actions/todos';
import styles from './index.module.css';

export default () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const todos: TodoProps[] = useSelector((state: any) => state.todos);
  const onClose = (event: any) => {
    const { detail } = event;
    Toast.success(`${detail}`);
    setShow(false);
  };
  const onConfirm = (event: any) => {
    const { detail } = event;
    console.log(`confirm${JSON.stringify(event)}`);
  };

  const getUserInfo = (info: any) => {
    console.log(`${JSON.stringify(info)}`);
  };
  const iconClick = () => {
    setShow(true);
  };
  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));

    wx.cloud
      .callFunction({
        // 云函数名称
        name: 'add',
        // 传给云函数的参数
        data: {
          a: 1,
          b: 2,
        },
      })
      .then((res) => {
        console.log(res.result); // 3
      })
      .catch(console.error);
  };
  return (
    <View className={styles.app}>
      <View className={styles.header}>
        <View className={styles.text}>
          编辑 开始{test}
          {process.env.REMAX_APP_API}
        </View>

        <View>
          <Button bindclick={iconClick}>弹出框</Button>
        </View>

        <DToast id="van-toast" />

        <Dialog
          use-slot
          title="标题"
          show={show}
          showConfirmButton
          showCancelButton={false}
          bindclose={onClose}
          confirmButtonOpenType="getUserInfo"
          bindconfirm={onConfirm}
          bindgetuserinfo={getUserInfo}
        >
          <Image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
        </Dialog>

        <View>
          {todos.map((item) => (
            <View
              className={item.completed ? styles.complated : ''}
              key={item.id + 1}
              onClick={() => handleToggle(item.id)}
            >
              {item.text}
            </View>
          ))}
        </View>
        <View>
          <Button bindclick={() => dispatch(asyncAdd('测试新增'))}>新增</Button>
        </View>
      </View>
    </View>
  );
};
