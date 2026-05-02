<template>
  <div class="con-box">
    <div class="left-box">
      <div class="title-box">
        <div class="nub">01</div>
        <div class="name">交通运输服务监督热线12328</div>
        <div class="line">
          <div class="head"></div>
        </div>
        <div class="tip-box">
          <div class="tip1" :class="!flagActive ? 'active' : ''" @click="handleClick(false)">总体指标</div>|
          <div class="tip2" :class="flagActive ? 'active' : ''" @click="handleClick(true)">货车司机</div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="bg-box h-[682px]">
        <div class="title">受理情况</div>
        <select-com class="select-com right-[150px]" />
        <div class="arr top-[4%] right-[80px]" @click="handleClickDialog('1')"></div>
        <div class="item-box mt-[20px]">
          <div class="mr-[50px]">
            <div class="mb-[24px] h-[161px] item-box jcsb">
              <div class="w-[467px] bg1 h-[161px]">
                <div class="item1-title">热线业务总量</div>
                <div class="item1-con">
                  <div>1490<span class="unit">件</span></div>
                  <div class="line"></div>
                  <div class="right">
                    <div class="item-box">
                      <div class="flex-1 mr-[10px]">同比</div><span class="down">-10.4%</span>
                    </div>
                    <div class="item-box">
                      <div class="flex-1 mr-[10px]">环比</div><span class="up">+5.2%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-[315px] bg2">
                <div class="item1-title">信息咨询</div>
                <div class="item1-con">
                  <span>1190</span>
                  <span class="unit mr-[10px]">件</span>
                  <span class="unit">占比</span>
                  <span>77.2%</span>
                </div>
              </div>
              <div class="w-[315px] bg2">
                <div class="item1-title">投诉举报</div>
                <div class="item1-con">
                  <span>1190</span>
                  <span class="unit  mr-[10px]">件</span>
                  <span class="unit">占比</span>
                  <span>77.2%</span>
                </div>
              </div>
              <div class="w-[315px] bg2">
                <div class="item1-title">意见建议</div>
                <div class="item1-con">
                  <span>1190</span>
                  <span class="unit mr-[10px]">件</span>
                  <span class="unit">占比</span>
                  <span>77.2%</span>
                </div>
              </div>
            </div>
            <div class="info-box w-[1478px] h-[343px]">
              <v-chart autoresize :option="lOption1" style="height: 100%; width: 100%;" />
            </div>
          </div>
          <div class="info-box w-[404px] h-[528px] relative">
            <div class='title-1 top-[30px] left-[30px]'>业务领域分布</div>
            <v-chart autoresize :option="lOption2" style="height: 100%; width: 100%;" />
          </div>
        </div>
      </div>
      <div class="bg-box l-box-2 h-[484px] my-[30px]">
        <div class="title">服务质量</div>
        <select-com class="select-com  right-[150px]" />
        <div class="arr top-[6%] right-[70px]" @click="handleClickDialog('2')"></div>
        <div class="item-box box1 mt-[20px]">
          <div class="info-box w-[1105px] h-[347px] mr-[20px]">
            <div class="item-box h-[96px] mb-[7px]">
              <div class="flex-1 bg1 item mr-[10px]">
                <div class="title">考核得分</div>
                <div class="numb">98分</div>
              </div>
              <div class="flex-1 bg1 item ml-[10px]">
                <div class="title">投诉举报类限时办结率</div>
                <div class="numb">100%</div>
              </div>
            </div>
            <div class="item-box h-[96px]  mb-[7px]">
              <div class="flex-1 bg2 item">
                <div class="title">投诉举报类回访率</div>
                <div class="numb">100%</div>
              </div>
              <div class="flex-1 bg2 item mx-[20px]">
                <div class="title">响应率</div>
                <div class="numb">100%</div>
              </div>
              <div class="flex-1 bg2 item">
                <div class="title">解决率</div>
                <div class="numb">100%</div>
              </div>
            </div>
            <div class="item-box h-[96px]">
              <div class="flex-1 bg2 item">
                <div class="title">满意率</div>
                <div class="numb">100%</div>
              </div>
              <div class="flex-1 bg2 item mx-[20px]">
                <div class="title">小程序工单差评整改率</div>
                <div class="numb">100%</div>
              </div>
              <div class="flex-1 bg2 item">
                <div class="title">工单办结信息规范率</div>
                <div class="numb">100%</div>
              </div>
            </div>
          </div>
          <div class="info-box w-[825px] h-[347px]">
            <v-chart autoresize :option="lOption3" style="height: 100%; width: 100%;" />
          </div>
        </div>
      </div>
      <div class="item-box">
        <div class="bg-box l-box-3 w-[665px] h-[484px]">
          <div class="title1">投诉热点</div>
          <div class="arr top-[6%] right-[50px]" @click="handleClickDialog('3')"></div>
          <div class="con">
            <div class="item">
              <div class="icon i1">1</div>
              <div class="name flex-1">满意率</div>
              <div class="count">1242</div>
              <div class="unit">件</div>
            </div>
            <div class="item">
              <div class="icon i2">2</div>
              <div class="name flex-1">非法运营</div>
              <div class="count">1112</div>
              <div class="unit">件</div>
            </div>
            <div class="item">
              <div class="icon i3">3</div>
              <div class="name flex-1">拒载</div>
              <div class="count">498</div>
              <div class="unit">件</div>
            </div>
            <div class="item">
              <div class="icon i4">4</div>
              <div class="name flex-1">计价议价</div>
              <div class="count">348</div>
              <div class="unit">件</div>
            </div>
            <div class="item">
              <div class="icon i4">5</div>
              <div class="name flex-1">文明服务</div>
              <div class="count">266</div>
              <div class="unit">件</div>
            </div>
          </div>
        </div>
        <div class="bg-box l-box-4 w-[665px] h-[484px] mx-[30px]">
          <div class="title1">高频咨询</div>
          <div class="arr top-[6%] right-[50px]" @click="handleClickDialog('4')"></div>
          <div class="con h-[400px]">
            <v-chart autoresize :option="lOption4" style="height: 100%; width: 100%;" />
          </div>
        </div>
        <div class="bg-box l-box-5 w-[665px] h-[484px]">
          <div class="title1">热门建议</div>
          <div class="arr top-[6%] right-[50px]" @click="handleClickDialog('5')"></div>
          <div class="con">
            <div class="active">
              <div class="title">
                <div class="name">非法运营</div>
                <div class="count">6</div>
                <div class="unit">件</div>
              </div>
              <div class="des">
                河北省承德市双滦区，一车牌号为冀 HGQ253白色现代轿车私家车做黑车，
              </div>
            </div>
            <div>
              <div class="title">
                <div class="name">拥堵信息</div>
                <div class="count">4</div>
                <div class="unit">件</div>
              </div>
              <div class="des">
                河北省承德市双滦区，一车牌号为冀 HGQ253白色现代轿车私家车做黑车，
              </div>
            </div>
            <div>
              <div class="title">
                <div class="name">环境卫生</div>
                <div class="count">2</div>
                <div class="unit">件</div>
              </div>
              <div class="des">
                河北省承德市双滦区，一车牌号为冀 HGQ253白色现代轿车私家车做黑车，
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class=" mx-[40px] center-box">
      <div class="title-box">
        <div class="nub">02</div>
        <div class="name">政务服务便民热线12345</div>
        <div class="line">
          <div class="head"></div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="bg-box h-[682px]">
        <div class="title">受理情况</div>
        <select-com class="select-com right-[150px]" />
        <div class="arr top-[4%] right-[80px]" @click="handleClickDialog('6')"></div>
        <div class="item-box mt-[20px]">
          <div class="mr-[50px]">
            <div class="mb-[24px] h-[161px] item-box jcsb">
              <div class="w-[467px] bg1 h-[161px]">
                <div class="item1-title">受理诉求总量</div>
                <div class="item1-con">
                  <div>1490<span class="unit">件</span></div>
                  <div class="line"></div>
                  <div class="right">
                    <div class="item-box">
                      <div class="flex-1 mr-[10px]">同比</div><span class="down">-10.4%</span>
                    </div>
                    <div class="item-box">
                      <div class="flex-1 mr-[10px]">环比</div><span class="up">+5.2%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-[133px] bg2">
                <div class="item1-title">咨询</div>
                <div class="item1-con">
                  <span>1</span>
                  <span class="unit">件</span>
                </div>
              </div>
              <div class="w-[133px] bg2">
                <div class="item1-title">建议</div>
                <div class="item1-con">
                  <span>2</span>
                  <span class="unit">件</span>
                </div>
              </div>
              <div class="w-[133px] bg2">
                <div class="item1-title">求助</div>
                <div class="item1-con">
                  <span>10</span>
                  <span class="unit">件</span>
                </div>
              </div>
              <div class="w-[133px] bg2">
                <div class="item1-title">表扬</div>
                <div class="item1-con">
                  <span>1</span>
                  <span class="unit">件</span>
                </div>
              </div>
              <div class="w-[133px] bg2">
                <div class="item1-title">举报</div>
                <div class="item1-con">
                  <span>4</span>
                  <span class="unit">件</span>
                </div>
              </div>
              <div class="w-[133px] bg2">
                <div class="item1-title">投诉</div>
                <div class="item1-con">
                  <span>89</span>
                  <span class="unit">件</span>
                </div>
              </div>
              <div class="w-[133px] bg2">
                <div class="item1-title">其他</div>
                <div class="item1-con">
                  <span>0</span>
                  <span class="unit">件</span>
                </div>
              </div>
            </div>
            <div class="info-box w-[1478px] h-[343px]">
              <v-chart autoresize :option="cOption1" style="height: 100%; width: 100%;" />
            </div>
          </div>
          <div class="info-box w-[404px] h-[528px] relative">
            <div class='title-1 top-[30px] left-[30px]'>业务领域分布</div>
            <v-chart autoresize :option="cOption2" style="height: 100%; width: 100%;" />
          </div>
        </div>
      </div>
      <div class="bg-box  h-[484px] my-[30px]">
        <div class="title">服务质量</div>
        <select-com class="select-com  right-[70px]" />
        <div class="item-box box1 mt-[20px]">
          <div class="info-box c-box-2 w-[733px] h-[347px] mr-[20px]">
            <div class="arr top-[0%] right-[0px]" @click="handleClickDialog('7')"></div>
            <div class="item">
              <div class="title">按时回复数</div>
              <div class="count">165<span>件</span></div>
            </div>
            <div class="item">
              <div class="title">按时回复率</div>
              <div class="count">99<span>%</span></div>
            </div>
            <div class="item">
              <div class="title">按时办结率</div>
              <div class="count">99<span>%</span></div>
            </div>
            <div class="item">
              <div class="title">重办率</div>
              <div class="count">4.85<span>%</span></div>
            </div>
            <div class="item">
              <div class="title">问题解决率</div>
              <div class="count">77.84<span>%</span></div>
            </div>
            <div class="item">
              <div class="title">办件满意率</div>
              <div class="count">99<span>%</span></div>
            </div>
          </div>
          <div class="info-box c-box-3 w-[1187px] h-[347px]">
            <div class="arr top-[0%] right-[0px]" @click="handleClickDialog('8')"></div>
            <div class="item">
              <div class="name">承德市交通运输综合行政执法支队</div>
              <div class="count">按时办结数<span>42件</span></div>
              <div class="unit">100%</div>
            </div>
            <div class="item2">
              <div class="name">河北承高智慧交通有限公司</div>
              <div class="count">按时办结数<span>22件</span></div>
              <div class="unit">100%</div>
            </div>
            <div class="item">
              <div class="name">承德市交通运输综合行政执法支队双滦执法大队</div>
              <div class="count">按时办结数<span>12件</span></div>
              <div class="unit">100%</div>
            </div>
            <div class="item2">
              <div class="name">承德市交通运输综合行政执法大队4队</div>
              <div class="count">按时办结数<span>6件</span></div>
              <div class="unit">100%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-box">
        <div class="bg-box l-box-3 w-[665px] h-[484px]">
          <div class="title1">投诉热点</div>
          <div class="arr top-[6%] right-[50px]" @click="handleClickDialog('9')"></div>
          <div class="con">
            <div class="item">
              <div class="icon i1">1</div>
              <div class="name flex-1">非法运营</div>
              <div class="count">1242</div>
              <div class="unit">件</div>
            </div>
            <div class="item">
              <div class="icon i2">2</div>
              <div class="name flex-1">出租车运价</div>
              <div class="count">1112</div>
              <div class="unit">件</div>
            </div>
            <div class="item">
              <div class="icon i3">3</div>
              <div class="name flex-1">其它巡游出租汽车管理</div>
              <div class="count">498</div>
              <div class="unit">件</div>
            </div>
            <div class="item">
              <div class="icon i4">4</div>
              <div class="name flex-1">计价议价</div>
              <div class="count">348</div>
              <div class="unit">件</div>
            </div>
            <div class="item">
              <div class="icon i4">5</div>
              <div class="name flex-1">文明服务</div>
              <div class="count">266</div>
              <div class="unit">件</div>
            </div>
          </div>
        </div>
        <div class="bg-box  l-box-4  w-[665px] h-[484px] mx-[30px]">
          <div class="title1">高频咨询</div>
          <div class="arr top-[6%] right-[50px]" @click="handleClickDialog('10')"></div>
          <div class="con h-[400px]">
            <v-chart autoresize :option="lOption4" style="height: 100%; width: 100%;" />
          </div>
        </div>
        <div class="bg-box l-box-5 w-[665px] h-[484px]">
          <div class="title1">热门建议</div>
          <div class="arr top-[6%] right-[50px]" @click="handleClickDialog('11')"></div>
          <div class="con">
            <div class="active">
              <div class="title">
                <div class="name">非法运营</div>
                <div class="count">6</div>
                <div class="unit">件</div>
              </div>
              <div class="des">
                河北省承德市双滦区，一车牌号为冀 HGQ253白色现代轿车私家车做黑车，
              </div>
            </div>
            <div>
              <div class="title">
                <div class="name">拥堵信息</div>
                <div class="count">4</div>
                <div class="unit">件</div>
              </div>
              <div class="des">
                河北省承德市双滦区，一车牌号为冀 HGQ253白色现代轿车私家车做黑车，
              </div>
            </div>
            <div>
              <div class="title">
                <div class="name">环境卫生</div>
                <div class="count">2</div>
                <div class="unit">件</div>
              </div>
              <div class="des">
                河北省承德市双滦区，一车牌号为冀 HGQ253白色现代轿车私家车做黑车，
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="title-box">
        <div class="nub">03</div>
        <div class="name">信访稳定工作</div>
        <div class="line">
          <div class="head"></div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="bg-box r-box-1 h-[235px]">
        <div class="arr top-[0%] right-[0px]" @click="handleClickDialog('12')"></div>
        <div class="item-box">
          <div class="info-box item-box w-[490px] h-[192px]">
            <div class="box w-[173px] h-[155px] mr-[8px] name">信访<br>总数</div>
            <div class="item">
              <div class="box w-[269px] h-[74px] mb-[10px] item-box">
                <div class="title">本年</div>
                <div class="line"></div>
                <div class="count">224<span>件</span></div>
              </div>
              <div class="box w-[269px] h-[74px] item-box">
                <div class="title">本月</div>
                <div class="line"></div>
                <div class="count">22<span>件</span></div>
              </div>
            </div>
          </div>
          <div class="info-box item-box  w-[490px] h-[192px]">
            <div class="box w-[173px] h-[155px] mr-[8px] name">来访<br>人次</div>
            <div class="item">
              <div class="box w-[269px] h-[74px] mb-[10px] item-box">
                <div class="title">本年</div>
                <div class="line"></div>
                <div class="count">224<span>件</span></div>
              </div>
              <div class="box w-[269px] h-[74px] item-box">
                <div class="title">本月</div>
                <div class="line"></div>
                <div class="count">22<span>件</span></div>
              </div>
            </div>
          </div>
          <div class="info-box item-box  w-[490px] h-[192px]">
            <div class="box w-[173px] h-[155px] mr-[8px] name">领导接访<br>约访人次</div>
            <div class="item">
              <div class="box w-[269px] h-[74px] mb-[10px] item-box">
                <div class="title">本年</div>
                <div class="line"></div>
                <div class="count">224<span>件</span></div>
              </div>
              <div class="box w-[269px] h-[74px] item-box">
                <div class="title">本月</div>
                <div class="line"></div>
                <div class="count">22<span>件</span></div>
              </div>
            </div>
          </div>
          <div class="info-box item-box  w-[490px] h-[192px]">
            <div class="box w-[138px] h-[155px] mr-[8px] name">进京访<br>批次</div>
            <div class="item1">
              <div class="box w-[304px] h-[74px] mb-[10px] item-box">
                <div class="title">本年</div>
                <div class="line"></div>
                <div class="count">14<span>批次</span></div>
                <div class="count">14<span>人次</span></div>
              </div>
              <div class="box w-[304px] h-[74px] item-box">
                <div class="title">本月</div>
                <div class="line"></div>
                <div class="count">2<span>批次</span></div>
                <div class="count">2<span>人次</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-box my-[30px]">
        <div class="bg-box w-[665px] h-[484px]">
          <div class="arr top-[6%] right-[30px]" @click="handleClickDialog('13')"></div>
          <div class="title1">信访案件组成</div>
          <v-chart autoresize :option="rOption1" style="height: 100%; width: 100%;" />
        </div>
        <div class="bg-box w-[665px] h-[484px] mx-[30px]">
          <div class="arr top-[6%] right-[30px]" @click="handleClickDialog('14')"></div>
          <div class="title1">信访责任单位</div>
          <v-chart autoresize :option="rOption2" style="height: 100%; width: 100%;" />
        </div>
        <div class="bg-box w-[665px] h-[484px]">
          <div class="title1">信访考核指标情况</div>
          <div class="arr top-[6%] right-[30px]" @click="handleClickDialog('15')"></div>
          <div class="r-box-4 item-box">
            <div class="e-item flex-1">
              <v-chart autoresize :option="rOption4" style="height: 70%; width: 100%;" />
              <div class="title">及时受理率</div>
            </div>
            <div class="e-item flex-1">
              <v-chart autoresize :option="rOption5" style="height: 70%; width: 100%;" />
              <div class="title">按期答复率</div>
            </div>
            <!-- <div class="item">
              <div class="icon1"></div>
              <div class="con">
                <div class="flex-1">及时受理率</div>
                <div>100%</div>
              </div>
            </div>
            <div class="item">
              <div class="icon2"></div>
              <div class="con">
                <div class="flex-1">按期答复率</div>
                <div>100%</div>
              </div>
            </div>
            <div class="item">
              <div class="icon3"></div>
              <div class="con">
                <div class="flex-1">一次性化解率</div>
                <div>100%</div>
              </div>
            </div> -->

          </div>
        </div>
      </div>
      <div class="bg-box  h-[372px] mb-[30px]">
        <div class="title2">信访工作法制化</div>
        <div class="arr top-[8%] right-[30px]" @click="handleClickDialog('16')"></div>
        <div class="item-box r-box-5 mt-[20px]">
          <div class="info-box box-1 w-[178px] h-[232px]">
            <div class="icon1"></div>
            <div class="name">信访案件</div>
            <div class="count">10<span>件</span></div>
          </div>
          <div class="info-box box-2 w-[1131px] h-[232px]">
            <div class="item">
              <div class="icon2"></div>
              <div>
                <div class="name">重复案件</div>
                <div class="count">10<span>件</span></div>
              </div>
            </div>
            <div class="item">
              <div class="icon3"></div>
              <div>
                <div class="name">交办案件</div>
                <div class="count">10<span>件</span></div>
              </div>
            </div>
            <div class="item">
              <div class="icon4"></div>
              <div>
                <div class="name">督办案件</div>
                <div class="count">10<span>件</span></div>
              </div>
            </div>
            <div class="item">
              <div class="icon2"></div>
              <div>
                <div class="name">待办重复案件</div>
                <div class="count">10<span>件</span></div>
              </div>
            </div>
            <div class="item">
              <div class="icon3"></div>
              <div>
                <div class="name">待办交办案件</div>
                <div class="count">10<span>件</span></div>
              </div>
            </div>
            <div class="item">
              <div class="icon4"></div>
              <div>
                <div class="name">待办督办案件</div>
                <div class="count">10<span>件</span></div>
              </div>
            </div>
          </div>
          <div class="info-box box-3 w-[619px] h-[232px]">
            <div class="item">
              <div class="icon5"></div>
              <div>
                <div class="name">待受理</div>
                <div class="count">12<span>件</span></div>
              </div>
            </div>
            <div class="item">
              <div class="icon5"></div>
              <div>
                <div class="name">待答复</div>
                <div class="count">12<span>件</span></div>
              </div>
            </div>
            <div class="item">
              <div class="icon5"></div>
              <div>
                <div class="name">待报告</div>
                <div class="count">12<span>件</span></div>
              </div>
            </div>
            <div class="item">
              <div class="icon6"></div>
              <div>
                <div class="name">已答复</div>
                <div class="count">132<span>件</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-box">
        <div class="bg-box w-[1360px] h-[531px] mr-[30px]">
          <div class="title2">进京访基本情况</div>
          <div class="arr top-[6%] right-[30px]" @click="handleClickDialog('17')"></div>
          <div class="table-box">
            <el-table :height="400" :data="tableData">
              <el-table-column label="时间" width="150">
                <template #default="{ row, $index }">
                  <div>{{ row.name }}</div>
                </template>
              </el-table-column>
              <el-table-column label="信访人" width="200">
                <template #default="{ row, $index }">
                  <div>{{ row.visit }}</div>
                </template>
              </el-table-column>
              <el-table-column label="责任单位" width="250">
                <template #default="{ row, $index }">
                  <div>{{ row.time }}</div>
                </template>
              </el-table-column>
              <el-table-column label="领导接访约访次数">
                <template #default="{ row, $index }">
                  <div>{{ row.unit }}</div>
                </template>
              </el-table-column>
              <el-table-column label="办结状态" width="180">
                <template #default="{ row, $index }">
                  <div :class="row.status == '已办结' ? 'ok' : 'uok'">{{ row.status }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="bg-box w-[665px] h-[531px]">
          <div class="title1">进京访责任单位情况</div>
          <div class="arr top-[6%] right-[30px]" @click="handleClickDialog('18')"></div>
          <v-chart autoresize :option="rOption3" style="height: 100%; width: 100%;" />
        </div>
      </div>
    </div>
  </div>
  <dialogIndex />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, toRefs } from 'vue';
import { useMenuStore, useDialogStore } from "../../store/index";
import SelectCom from './components/selectCom.vue'
import dialogIndex from '../dialog/index.vue'

const dialogStore = useDialogStore();

const storeMenu = useMenuStore();
const { activeTab } = toRefs(storeMenu)

const flagActive = ref(false)
function handleClick(flag: any) {
  if (flagActive.value === flag) {
    return
  } else {
    flagActive.value = flag
  }
}

const tableData = [
  {
    time: '2021.01.01',
    name: '张洪斌',
    unit: '承德市地方道路发展中心',
    visit: '治安类',
    status: '已办结'
  },
  {
    time: '2021.01.01',
    name: '张洪斌',
    unit: '承德市地方道路发展中心',
    visit: '治安类',
    status: '未办结'
  },
  {
    time: '2021.01.01',
    name: '张洪斌',
    unit: '承德市地方道路发展中心',
    visit: '治安类',
    status: '已办结'
  },
  {
    time: '2021.01.01',
    name: '张洪斌',
    unit: '承德市地方道路发展中心',
    visit: '治安类',
    status: '已办结'
  },
  {
    time: '2021.01.01',
    name: '张三',
    unit: '部门一',
    visit: '刑事犯罪',
    status: '已办结'
  }
]

var xData = ["1月", "2月", "3月", "4月", "5月", "6月"];
const dataBase: Record<string, number[]> = {
  '意见建议': [41, 58, 38, 70, 90, 75],
  '投诉举报': [100, 82, 82, 30, 50, 70],
  '信息咨询': [55, 38, 50, 50, 30, 95],
};
const color = ['#FFBD81', '#A0F9FF', '#6FF2A4', '#1fa9e3'];
let serviceList = [];
let index = 0;

for (let key in dataBase) {
  let item = {
    name: key,
    type: 'bar',
    barWidth: '15%',
    // 移除：yAxisIndex: index（单Y轴无需指定）
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: color[index] ?? '#000000'
        }, {
          offset: 1,
          color: 'rgba(0,0,0,0)'
        }]),
        barBorderRadius: 0,
        border: '2px solid #ddd'
      }
    },
    data: dataBase[key]
  };
  index++;
  serviceList.push(item);
}

let lOption1 = {
  // backgroundColor: '#060B1C',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'none',
    padding: 5,
    formatter: function (param: any) {
      var resultTooltip = "<div style='background:rgba(13,5,30,.6);border:1px solid rgba(255,255,255,.2);padding:5px;border-radius:3px;'>" +
        "<div style='text-align:center;'>" + param[0].name + "</div>" +
        "<div style='padding-top:5px;'>";
      for (var i = 0; i < param.length; i++) {
        // 保持原有tooltip颜色逻辑（获取渐变起始色）
        resultTooltip +=
          "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:" + param[i].color.colorStops[0].color + ";'></span>" +
          "<span style=''> " + param[i].seriesName + ": </span>" +
          "<span style='color:" + param[i].color.colorStops[0].color + "'>" + param[i].value + "</span></br>";
      }
      resultTooltip += "</div></div>";
      return resultTooltip;
    }
  },
  grid: {
    left: '8%', // 原150px改为百分比，适配单Y轴布局
    top: '20%',
    right: '0%', // 原150px缩减，避免空白过多
    bottom: '20%',
  },
  legend: {
    top: '0.5%',
    right: '3%',
    itemWidth: 18.5,
    itemHeight: 6,
    itemGap: 30,
    textStyle: {
      color: '#C9C8CD',
      fontSize: 28,
    }
  },
  xAxis: [{
    type: 'category',
    data: xData,
    axisLabel: {
      show: true,
      fontSize: 9,
      textStyle: {
        color: "#CAE9FF",

        fontSize: 30
      },
      formatter: function (value: any) {
        return value;
      }
    },
    axisLine: {
      show: false // 保留X轴线
    },
    axisTick: {
      show: false // 隐藏刻度
    },
    splitLine: {
      show: false
    }
  }],
  yAxis: [{ // 只保留一个Y轴，整合原有样式
    type: 'value',
    axisTick: {
      show: false // 隐藏Y轴刻度
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      textStyle: {
        color: '#CAE9FF', // Y轴文字颜色
        fontSize: 30
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dotted",
        color: '#82909D',
        width: 2.6,
        // color: "#03202E" // 保留原有分割线颜色
      }
    },
    name: '单位：件',
    nameTextStyle: {
      color: '#CAE9FF',
      fontSize: 32
    },
    nameLocation: 'end' // 单位位置：end（顶部）/ start（底部）
  }],
  series: serviceList
};


function getPie3D(pieData: any[], internalDiameterRatio: number) {
  let series: any[] = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    let seriesItem: any = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k
      }
    };

    if (typeof pieData[i].itemStyle != 'undefined') {
      let itemStyle: any = {};
      if (typeof pieData[i].itemStyle.color != 'undefined') itemStyle.color = pieData[i].itemStyle.color;
      if (typeof pieData[i].itemStyle.opacity != 'undefined') itemStyle.opacity = pieData[i].itemStyle.opacity;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );
    startValue = endValue;
  }

  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: { show: false },
    itemStyle: { opacity: 0.05, color: '#E1E8EC' },
    parametricEquation: {
      u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
      v: { min: 0, max: Math.PI, step: Math.PI / 20 },
      x: function (u: number, v: number) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
      },
      y: function (u: number, v: number) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
      },
      z: function (u: number, v: number) {
        return Math.cos(v) > 0 ? -0.5 : -5;
      }
    }
  });

  return series;
}

function getParametricEquation(startRatio: number, endRatio: number, isSelected: boolean, isHovered: boolean, k: number, height: number) {
  let midRatio = (startRatio + endRatio) / 2;
  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  k = typeof k !== 'undefined' ? k : 1 / 3;

  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  let hoverRate = isHovered ? 1.05 : 1;

  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },
    x: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z: function (u: number, v: number) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u);
      }
      return Math.sin(v) > 0 ? 1 * height : -1;
    }
  };
}

const pieData2 = [
  { name: '普通公路', value: 872, itemStyle: { color: '#266DC7', opacity: 0.6 } },
  { name: '道路运输', value: 636, itemStyle: { color: '#34B7CC', opacity: 0.6 } },
  { name: '城市客运', value: 423, itemStyle: { color: '#1ADCDE', opacity: 0.6 } },
  { name: '高速公路', value: 142, itemStyle: { color: '#3DCE7E', opacity: 0.6 } },
  { name: '其他', value: 34, itemStyle: { color: '#EEC380', opacity: 0.6 } }
];

const series2 = getPie3D(pieData2, 0.7);
const lOption2 = ref({
  backgroundColor: 'transparent',
  animation: true,
  silent: false,
  legend: [
    {
      data: [pieData2[0]?.name || ''],
      top: '12%',
      left: '5%',
      orient: 'horizontal',
      itemWidth: 20,
      itemHeight: 12,
      width: '48%',
      textStyle: {
        fontFamily: 'AlibabaPuHuiTiRegular',
        fontWeight: 400,
        fontSize: 30,
        color: '#CAE9FF',
        textAlign: 'left',
        fontStyle: 'normal',
        textTransform: 'none'
      }
    },
    {
      data: [pieData2[1]?.name || ''],
      top: '22%',
      left: '5%',
      orient: 'horizontal',
      itemWidth: 20,
      itemHeight: 12,
      width: '48%',
      textStyle: {
        fontFamily: 'AlibabaPuHuiTiRegular',
        fontWeight: 400,
        fontSize: 30,
        color: '#CAE9FF',
        textAlign: 'left',
        fontStyle: 'normal',
        textTransform: 'none'
      }
    },
    {
      data: [pieData2[2]?.name || ''],
      top: '32%',
      left: '5%',
      orient: 'horizontal',
      itemWidth: 20,
      itemHeight: 12,
      width: '48%',
      textStyle: {
        fontFamily: 'AlibabaPuHuiTiRegular',
        fontWeight: 400,
        fontSize: 30,
        color: '#CAE9FF',
        textAlign: 'left',
        fontStyle: 'normal',
        textTransform: 'none'
      }
    },
    {
      data: [pieData2[3]?.name || ''],
      top: '42%',
      left: '5%',
      orient: 'horizontal',
      itemWidth: 20,
      itemHeight: 12,
      width: '48%',
      textStyle: {
        fontFamily: 'AlibabaPuHuiTiRegular',
        fontWeight: 400,
        fontSize: 30,
        color: '#CAE9FF',
        textAlign: 'left',
        fontStyle: 'normal',
        textTransform: 'none'
      }
    },
    {
      data: [pieData2[4]?.name || ''],
      top: '52%',
      left: '5%',
      orient: 'horizontal',
      itemWidth: 20,
      itemHeight: 12,
      width: '48%',
      textStyle: {
        fontFamily: 'AlibabaPuHuiTiRegular',
        fontWeight: 400,
        fontSize: 30,
        color: '#CAE9FF',
        textAlign: 'left',
        fontStyle: 'normal',
        textTransform: 'none'
      }
    },
  ],
  tooltip: {
    show: true,
    trigger: 'item',
    backgroundColor: 'rgba(0, 15, 30, 0.9)',
    borderColor: '#00D4FF',
    borderWidth: 2,
    padding: [12, 16],
    borderRadius: 6,
    textStyle: {
      fontSize: 14,
      fontFamily: 'AlibabaPuHuiTiRegular',
      color: '#FFFFFF'
    },
    extraCssText: 'box-shadow: 0 0 8px rgba(0, 212, 255, 0.4); backdrop-filter: blur(8px);',
    formatter: function (params: any) {
      if (params.seriesName === 'mouseoutSeries') return '';
      const color = params.color || '#00D4FF';
      const name = params.seriesName;
      const pieDataItem = pieData2.find(item => item.name === name);
      const value = pieDataItem ? pieDataItem.value : 0;
      return `<div style="color: #FFFFFF;">
                <div style="font-size: 30px; color: ${color}; font-weight: 600; text-shadow: 1px 1px 0 ${color};">
                    ${name}: ${value}公里
                </div>
            </div>`;
    }
  },
  xAxis3D: {
    min: -1,
    max: 1,
    show: false
  },
  yAxis3D: {
    min: -1,
    max: 1,
    show: false
  },
  zAxis3D: {
    min: -1,
    max: 1,
    show: false
  },
  grid3D: {
    show: false,
    boxHeight: 0.03,
    top: '45%',
    left: '0%',
    height: '50%',
    environment: 'none',
    light: {
      main: {
        intensity: 1.2,
        shadow: false
      },
      ambient: {
        intensity: 0.3
      }
    },
    viewControl: {
      distance: 120,
      alpha: 25,
      beta: 60,
      autoRotate: false,
      enableRotate: true,
      enableZoom: false,
      enablePan: false,
      mouseRotateSpeed: 1,
      mousePanSpeed: 0,
      mouseZoomSpeed: 0
    }
  },
  series: series2
});


let xDatal3 = ['1月', '2月', '3月', '4月', '5月', '6月']
let yDatal3 = [
  120, 200, 150, 80, 70, 110
]
const lOption3 = {
  grid: {
    top: '20%',
    left: '5%',
    right: '5%',
    bottom: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: xDatal3,
    axisLabel: {
      fontSize: 32,
      textStyle: {
        color: "#C9C8CD" //X轴文字颜色
      },
    },
    axisLine: {
      show: false,

    },
    axisTick: { show: false },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      show: true,
      fontSize: 32,
      textStyle: {
        color: "#C9C8CD" //X轴文字颜色
      },
    },
    name: '单位：件',
    nameTextStyle: {
      color: '#CAE9FF',
      fontSize: 32
    },
    nameLocation: 'end',
    // y轴最大值，必须比yData的值更大，否则数据显示不全
    max: Math.max(...yDatal3) + 50,
    splitLine: {
      show: true,
      lineStyle: {
        // 实线
        // type: 'solid',
        // width: 0.5,
        // opacity: 0.8,

        // 虚线
        type: [5, 5],
        dashOffset: 0,
        shadowBlur: 0,
        color: 'rgba(130, 144, 157, 0.59)',
      },
    }
  },
  series: [
    {
      data: yDatal3,
      type: 'bar',
      barWidth: 20,
      barGap: '25%',
      // 假设的y轴
      label: {
        show: false,
        // 文字颜色
        color: '#61B1F8',
        position: 'top',
        formatter: '{c}',
        fontSize: 12,
      },
      itemStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          type: 'linear',
          global: false,
          colorStops: [
            { offset: 0, color: '#BAEAFD' },
            { offset: 0.5, color: '#ACE7FF' },
            { offset: 1, color: 'rgba(127, 206, 255, 0)' },
          ],
        },
      },
    },
  ],
};

let nameList = ["亲切", "疑难解答", "启发", "友好", "扩展思维", "思考能力", "知识", "关心", "平易近人", "认真负责"];
let valueList = [30, 50, 60, 65, 70, 80, 90, 100, 120, 150];
let datal4: any[] = [];
nameList.map((item, index: number) => {
  let i = Math.floor(index / 5);
  datal4.push(
    {
      name: item,
      value: valueList[i],
      label: {
        color: ['#ccc', '#ddd', '#999', '#f1f1f1', '#e1e1e1', '#fff'][i],
        fontSize: [22, 24, 26, 28, 30][i]
      }
    }
  )
})
// 词云图
const lOption4 = {
  color: ['#ccc', '#ddd', '#999', '#f1f1f1', '#e1e1e1', '#fff'],
  series: [
    {
      type: 'graph',
      layout: 'force',
      force: {
        repulsion: 85,// 节点之间的斥力因子
        edgeLength: 85, //边的两个节点之间的距离
        layoutAnimation: true,
        friction: 0.5
      },
      roam: false,
      symbol: '',
      symbolSize: 0,
      label: {
        show: true,
        color: 'auto',
      },
      draggable: false,
      data: datal4
    }
  ]
}

var xDatac1 = ["1月", "2月", "3月", "4月", "5月", "6月"];
const dataBasec1: Record<string, number[]> = {
  '咨询': [41, 58, 38, 70, 90, 75],
  '建议': [100, 82, 82, 30, 50, 70],
  '求助': [55, 38, 50, 50, 30, 95],
  '表扬': [55, 38, 50, 50, 30, 95],
  '举报': [55, 38, 50, 50, 30, 95],
  '投诉': [55, 38, 50, 50, 30, 95],
};
const colorc1 = ['#FFBD81', '#A0F9FF', '#6FF2A4', '#88A5EB', '#DB8EDF', '#FF7D7D'];
let serviceListc1 = [];
let indexc1 = 0;

for (let key in dataBasec1) {
  let item = {
    name: key,
    type: 'bar',
    barWidth: 20,
    // 移除：yAxisIndex: index（单Y轴无需指定）
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: colorc1[indexc1] ?? '#000000'
        }, {
          offset: 1,
          color: 'rgba(0,0,0,0)'
        }]),
        barBorderRadius: 0,
        border: '2px solid #ddd'
      }
    },
    data: dataBasec1[key]
  };
  indexc1++;
  serviceListc1.push(item);
}

let cOption1 = {
  // backgroundColor: '#060B1C',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'none',
    padding: 5,
    formatter: function (param: any) {
      var resultTooltip = "<div style='background:rgba(13,5,30,.6);border:1px solid rgba(255,255,255,.2);padding:5px;border-radius:3px;'>" +
        "<div style='text-align:center;'>" + param[0].name + "</div>" +
        "<div style='padding-top:5px;'>";
      for (var i = 0; i < param.length; i++) {
        // 保持原有tooltip颜色逻辑（获取渐变起始色）
        resultTooltip +=
          "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:" + param[i].color.colorStops[0].color + ";'></span>" +
          "<span style=''> " + param[i].seriesName + ": </span>" +
          "<span style='color:" + param[i].color.colorStops[0].color + "'>" + param[i].value + "</span></br>";
      }
      resultTooltip += "</div></div>";
      return resultTooltip;
    }
  },
  grid: {
    left: '8%', // 原150px改为百分比，适配单Y轴布局
    top: '20%',
    right: '0%', // 原150px缩减，避免空白过多
    bottom: '20%',
  },
  legend: {
    top: '0.5%',
    right: '3%',
    itemWidth: 18.5,
    itemHeight: 6,
    itemGap: 30,
    textStyle: {
      color: '#C9C8CD',
      fontSize: 28,
    }
  },
  xAxis: [{
    type: 'category',
    data: xDatac1,
    axisLabel: {
      show: true,
      fontSize: 9,
      textStyle: {
        color: "#CAE9FF",

        fontSize: 30
      },
      formatter: function (value: any) {
        return value;
      }
    },
    axisLine: {
      show: false // 保留X轴线
    },
    axisTick: {
      show: false // 隐藏刻度
    },
    splitLine: {
      show: false
    }
  }],
  yAxis: [{ // 只保留一个Y轴，整合原有样式
    type: 'value',
    axisTick: {
      show: false // 隐藏Y轴刻度
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      textStyle: {
        color: '#CAE9FF', // Y轴文字颜色
        fontSize: 30
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dotted",
        color: '#82909D',
        width: 2.6,
        // color: "#03202E" // 保留原有分割线颜色
      }
    },
    name: '单位：件',
    nameTextStyle: {
      color: '#CAE9FF',
      fontSize: 32
    },
    nameLocation: 'end' // 单位位置：end（顶部）/ start（底部）
  }],
  series: serviceListc1
};
const cOption2 = {
  grid: {
    left: '5%',
    right: '5%',
    bottom: 0,
    top: '15%',
    containLabel: false,
  },
  xAxis: {
    show: false,
    max: 600
  },
  yAxis: [
    {
      type: "category",
      data: ['城市客运', '道路运输', '公路运输', '交通运行秩序', '农村'],
      axisTick: "none",
      axisLine: "none",
      axisLabel: {
        show: true,
        color: '#CAE9FF',  // 亮蓝色柱子
        align: 'top',
        verticalAlign: 'bottom',
        padding: [0, 0, 25, 10],
        fontSize: 28
      },
    }
  ],
  series: [
    {
      name: 'value',
      type: 'bar',
      zlevel: 1,
      showBackground: true,
      backgroundStyle: {
        opacity: 0.2,
        color: 'rgba(131, 242, 255, 0.90)',  // 亮蓝色柱子
        borderRadius: 20  // 右侧圆角
      },
      itemStyle: {
        color: 'rgba(131, 242, 255, 0.90)',  // 亮蓝色柱子
        borderRadius: 20  // 右侧圆角
      },
      barWidth: '20%',
      data: [100, 200, 420, 500, 200],
    }
  ],
}
const cOption3 = {}

const PIE_DATA = [
  { name: "客货运输", value: 55, proportion: "27%" },
  { name: "工程建设", value: 52, proportion: "25%" },
  { name: "涉法涉诉", value: 48, proportion: "23%" },
  { name: "执法监督", value: 50, proportion: "24%" }
];

const HIDDEN_OPTIONS = {
  normal: { show: false },
  emphasis: { show: false }
};

const BASE_PIE_CONFIG = {
  center: ["30%", "50%"],
  type: "pie",
  label: HIDDEN_OPTIONS,
  labelLine: HIDDEN_OPTIONS,
};
const rOption1 = {
  title: {
    text: "案件数量",
    subtext: "336",
    textStyle: { color: "#CAE9FF", fontSize: 30 },
    subtextStyle: { fontSize: 42, color: "#CAE9FF" },
    textAlign: "center",
    textVerticalAlign: "middle",
    x: "30%",
    y: "46%"
  },
  legend: {
    right: 0,
    top: "center",
    orient: "vertical",
    itemGap: 40,
    textStyle: { color: "#CAE9FF", fontSize: 32 },
    formatter: (params: any) => {
      const item = PIE_DATA.find(i => i.name === params);
      return `${params} ${item!.value}件`;
    },
    data: PIE_DATA
  },
  series: [
    // 主饼图
    {
      ...BASE_PIE_CONFIG,
      color: ["#1AD6DD", "#57E9B6", "#66C9E4", '#EAC866'],
      radius: ["50%", "60%"],
      padAngle: 4,

      data: PIE_DATA
    },
    {
      ...BASE_PIE_CONFIG,
      silent: true,
      radius: ["40%", "50%"],
      data: [{ value: 0, itemStyle: { color: "#0C3D6B" } }]
    },
  ]
};


let xDatar2 = ['执法支队', '公路养护 事业发...', '公路建设 事业发...', '地方道路 事业发...']
let yDatar2 = [
  120, 200, 150, 80
]
const rOption2 = {
  grid: {
    top: '20%',
    left: '5%',
    right: '5%',
    bottom: '20%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: xDatar2,
    axisLabel: {
      fontSize: 32,
      textStyle: {
        color: "#C9C8CD" //X轴文字颜色
      },
    },
    axisLine: {
      show: false,

    },
    axisTick: { show: false },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      show: true,
      fontSize: 32,
      textStyle: {
        color: "#C9C8CD" //X轴文字颜色
      },
    },
    name: '单位：件',
    nameTextStyle: {
      color: '#CAE9FF',
      fontSize: 32
    },
    nameLocation: 'end',
    // y轴最大值，必须比yData的值更大，否则数据显示不全
    max: Math.max(...yDatar2) + 50,
    splitLine: {
      show: true,
      lineStyle: {
        // 实线
        // type: 'solid',
        // width: 0.5,
        // opacity: 0.8,

        // 虚线
        type: [5, 5],
        dashOffset: 0,
        shadowBlur: 0,
        color: 'rgba(130, 144, 157, 0.59)',
      },
    }
  },
  series: [
    {
      data: yDatar2,
      type: 'bar',
      barWidth: 20,
      barGap: '25%',
      // 假设的y轴
      label: {
        show: false,
        // 文字颜色
        color: '#61B1F8',
        position: 'top',
        formatter: '{c}',
        fontSize: 12,
      },
      itemStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          type: 'linear',
          global: false,
          colorStops: [
            { offset: 0, color: '#BAEAFD' },
            { offset: 0.5, color: '#ACE7FF' },
            { offset: 1, color: 'rgba(127, 206, 255, 0)' },
          ],
        },
      },
    },
  ],
};


const rOption3 = {
  color: "#04CFE4",
  grid: {
    top: 80,
    left: 60,
    right: 40,
    bottom: '30%'
  },
  xAxis: {
    type: 'category',
    axisTick: false,
    axisLabel: {
      interval: 0,
      color: '#9EC0CC',
      fontSize: 28
    },
    data: ['数据1', '数据2', '数据3']
  },
  yAxis: {
    name: '单位：件',
    nameTextStyle: {
      color: '#CAE9FF',
      fontSize: 32
    },
    type: 'value',
    interval: 100,
    axisLabel: {
      color: '#9EC0CC',
      fontSize: 28
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dotted",
        color: '#82909D',
        width: 2.6,
        // color: "#03202E" // 保留原有分割线颜色
      }
    }
  },
  series: [
    {
      data: [80, 200, 150],
      type: "pictorialBar",
      symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
    }
  ]
}

const rvalue1 = 75;
const rRate1 = Math.round(rvalue1 * 100 / 100);
const rOption4 = {
  // backgroundColor: 'rgba(16, 33, 71)', //设置背景颜色
  title: [
    {
      text: "{a|" + rRate1 + '%' + "}",
      show: true,
      x: "center",
      y: "42%",
      textStyle: {
        rich: {
          a: {
            fontSize: 48,
            color: '#4CA5F8',
            fontWeight: '400',
            fontFamily: 'zihun143hao-zhengkuchaojihei, zihun143hao-zhengkuchaojihei'
          },
        },
      },
    },
  ],
  polar: {
    center: ["50%", "50%"],
    radius: ["60%", "75%"],
  },
  angleAxis: {
    max: 100,
    show: false,
  },
  radiusAxis: {
    type: "category",
    show: true,
    axisLabel: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['0%', '50%'], // 调整半径控制圆的大小
      center: ['50%', '50%'],
      data: [{ value: 100 }],
      itemStyle: {
        color: 'rgba(255, 255, 255, 0.08)', // 深色背景
        borderWidth: 0
      },
      label: { show: false },
      labelLine: { show: false },
      z: 0
    },
    {
      data: [rvalue1],
      name: "",
      type: "bar",
      roundCap: true,
      showBackground: true,
      backgroundStyle: {
        color: "rgba(19, 84, 146, .4)",
      },
      coordinateSystem: "polar",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 1,
              color: "rgba(95, 240, 250, 1)",
            },
            {
              offset: 0,
              color: "rgba(76, 164, 247, 1)",
            },
          ]),
        },
      },
    },
  ],
}

const rvalue2 = 75;
const rRate2 = Math.round(rvalue2 * 100 / 100);
const rOption5 = {
  // backgroundColor: 'rgba(16, 33, 71)', //设置背景颜色
  title: [
    {
      text: "{a|" + rRate2 + '%' + "}",
      show: true,
      x: "center",
      y: "42%",
      textStyle: {
        rich: {
          a: {
            fontSize: 48,
            color: '#6FF2A4',
            fontWeight: '400',
            fontFamily: 'zihun143hao-zhengkuchaojihei, zihun143hao-zhengkuchaojihei'
          },
        },
      },
    },
  ],
  polar: {
    center: ["50%", "50%"],
    radius: ["60%", "75%"],
  },
  angleAxis: {
    max: 100,
    show: false,
  },
  radiusAxis: {
    type: "category",
    show: true,
    axisLabel: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['0%', '50%'], // 调整半径控制圆的大小
      center: ['50%', '50%'],
      data: [{ value: 100 }],
      itemStyle: {
        color: 'rgba(255, 255, 255, 0.08)', // 深色背景
        borderWidth: 0
      },
      label: { show: false },
      labelLine: { show: false },
      z: 0
    },
    {
      data: [rvalue2],
      name: "",
      type: "bar",
      roundCap: true,
      showBackground: true,
      backgroundStyle: {
        color: "rgba(19, 84, 146, .4)",
      },
      coordinateSystem: "polar",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 1,
              color: "#A4FD9C",
            },
            {
              offset: 0,
              color: "#6FF2A4",
            },
          ]),
        },
      },
    },
  ],
}

function handleClickDialog(value: string) {
  console.log('点击项目', value);
  switch (value) {
    case '1':
      dialogStore.setDialogVisible('受理情况', value)
      break;
    case '2':
      dialogStore.setDialogVisible('服务质量', value)
      break;
    case '3':
      dialogStore.setDialogVisible('投诉热点', value)
      break;
    case '4':
      dialogStore.setDialogVisible('高频咨询', value)
      break;
    case '5':
      dialogStore.setDialogVisible('热门建议', value)
      break;
    case '6':
      dialogStore.setDialogVisible('受理情况c', value)
      break;
    case '7':
      dialogStore.setDialogVisible('服务质量c', value)
      break;
    case '8':
      dialogStore.setDialogVisible('责任单位c', value)
      break;
    case '9':
      dialogStore.setDialogVisible('投诉热点c', value)
      break;
    case '10':
      dialogStore.setDialogVisible('高频咨询c', value)
      break;
    case '11':
      dialogStore.setDialogVisible('热门建议c', value)
      break;
    case '12':
      dialogStore.setDialogVisible('信访稳定工作', value)
      break;
    case '13':
      dialogStore.setDialogVisible('信访案件', value)
      break;
    case '14':
      dialogStore.setDialogVisible('信访责任', value)
      break;
    case '15':
      dialogStore.setDialogVisible('信访考核', value)
      break;
    case '16':
      dialogStore.setDialogVisible('信访工作', value)
      break;
    case '17':
      dialogStore.setDialogVisible('进京访基本情况', value)
      break;
    case '18':
      dialogStore.setDialogVisible('进京访责任单位', value)
      break;
    default:
      break;
  }
}
</script>

<style lang="scss" scoped>
.select-com {
  position: absolute;
  // right: 70px;
  top: 10px;
}

.arr {
  pointer-events: all;
  position: absolute;
  width: 40px !important;
  height: 40px !important;
  background: url('/src/assets/image/complaintHandling/双箭头.png') center/cover;
}

.con-box {
  // background: skyblue;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .title-1 {
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 400;
    font-size: 32px;
    color: #FFFFFF;
    line-height: 45px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    position: absolute;
    padding-left: 20px;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 8px;
      height: 25px;
      background: #10FCFF;
      border-radius: 1px 1px 1px 1px;
    }
  }

  .left-box {
    .bg1 {
      background: url('/src/assets/image/complaintHandling/组 43224.png') no-repeat center 100%;
      height: 161px;
    }

    .bg2 {
      background: url('/src/assets/image/complaintHandling/组 43023.png') no-repeat center 100%;
    }

    .item1-title {
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: 700;
      font-size: 34px;
      color: #FFFFFF;
      line-height: 60px;
      text-shadow: 0px 15px 37px rgba(0, 0, 0, 0.3);
      text-align: center;
      font-style: normal;
      text-transform: none;
    }

    .item1-con {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      padding: 0 10px;

      &>span {
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: 700;
        font-size: 36px;
        color: #FFFFFF;
        line-height: 80px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      &>div {
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: 700;
        font-size: 60px;
        color: #FFFFFF;
        line-height: 60px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .right {
        font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
        font-weight: 400;
        font-size: 32px;
        line-height: 45px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(90deg, #47D7FF 0%, #DAFDFF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .unit {
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: 700;
        font-size: 30px;
        color: #5385C4;
        line-height: 26px;
        // text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .line {
        position: relative;
        height: 76px;
        width: 2px;
        background: url('/src/assets/image/complaintHandling/Vector 615.png') no-repeat center;
        margin: 0 20px;
      }
    }

    .l-box-2 {
      &>.box1 {

        .bg1 {
          background: url('/src/assets/image/complaintHandling/1.png') no-repeat 100%;
          height: 96px;
        }

        .bg2 {
          background: url('/src/assets/image/complaintHandling/1.png') no-repeat 100%;
          height: 96px;
        }

        .item {
          // border-radius: 4px 4px 4px 4px;
          // border: 2px solid;
          // border-image: linear-gradient(180deg, rgba(88.04525792598724, 168.64750564098358, 188.79808276891708, 1), rgba(88.04525792598724, 168.64750564098358, 188.79808276891708, 1), rgba(88.00000235438347, 168.73333543539047, 189.00000393390656, 0)) 2 2;
          padding-left: 20px;

          .title {
            font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
            font-weight: 400;
            font-size: 30px;
            color: #4CCEF9;
            line-height: 56px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }

          .numb {
            font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
            font-weight: 600;
            font-size: 32px;
            color: #FFFFFF;
            line-height: 45px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }
        }
      }
    }

    .l-box-3 {
      &>.con {
        margin-top: 25px;

        .item {
          height: 52px;
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          background: url('/src/assets/image/complaintHandling/矩形 3666.png') no-repeat center;
          padding-left: 18px;
          padding-right: 40px;

          .icon {
            width: 36px;
            height: 36px;
            font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
            font-weight: 700;
            font-size: 30px;
            color: #FFFFFF;
            line-height: 36px;
            text-align: center;
            font-style: normal;
            text-transform: none;
            margin-right: 11px;
          }

          .i1 {
            background: url('/src/assets/image/complaintHandling/多边形 2.png') no-repeat center;
          }

          .i2 {
            background: url('/src/assets/image/complaintHandling/多边形 3.png') no-repeat center;
          }

          .i3 {
            background: url('/src/assets/image/complaintHandling/多边形 4.png') no-repeat center;
          }

          .i4 {
            background: url('/src/assets/image/complaintHandling/多边形 5.png') no-repeat center;
          }

          .name {
            font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
            font-weight: 700;
            font-size: 32px;
            line-height: 45px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            background: linear-gradient(180deg, #9FE4FF 0%, #9FD7FF 21%, #EAF8FF 85%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .count {
            font-family: D-DIN Condensed, D-DIN Condensed;
            font-weight: 400;
            font-size: 34px;
            color: #10FCFF;
            line-height: 48px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            margin-right: 8px;
          }

          .unit {
            font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
            font-weight: 400;
            font-size: 30px;
            // background: linear-gradient(0deg, #193654 0%, rgba(25, 54, 84, 0) 100%);
            color: #193654;
            line-height: 42px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            // -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
          }
        }
      }
    }

    .l-box-4 {
      &>.con {
        width: 514px;
        background: url('/src/assets/image/complaintHandling/组 43208.png') no-repeat 100%;
      }
    }

    .l-box-5 {
      .con {
        &>div {
          width: 570px;
          // height: 52px;
          margin-top: 20px;

          .title {
            background: linear-gradient(90deg, #193654 0%, rgba(25, 54, 84, 0) 100%);
            height: 52px;
            display: flex;
            align-items: center;
            padding: 0 33px;

            .name {
              font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
              font-weight: 700;
              font-size: 32px;
              // line-height: 45px;
              text-align: left;
              font-style: normal;
              text-transform: none;
              background: linear-gradient(180deg, #9FE4FF 0%, #9FD7FF 21%, #EAF8FF 85%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              flex: 1;
            }

            .count {
              font-family: D-DIN Condensed, D-DIN Condensed;
              font-weight: 400;
              font-size: 34px;
              color: #10FCFF;
              line-height: 40px;
              text-align: left;
              font-style: normal;
              text-transform: none;
              margin-right: 7px;
            }

            .unit {
              font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
              font-weight: 400;
              font-size: 30px;
              color: #FFFFFF;
              line-height: 45px;
              text-align: left;
              font-style: normal;
              text-transform: none;
            }
          }

          .des {
            display: none;
          }
        }

        .active {
          .title {
            background: linear-gradient(90deg, #26517D 0%, rgba(38, 81, 125, 0) 100%);
          }

          .des {
            padding: 0 30px;
            display: block;
            height: 141px;
            background: rgba(25, 54, 84, .5);
            font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
            font-weight: 400;
            font-size: 30px;
            color: #FFFFFF;
            line-height: 70px;
            text-align: justify;
            font-style: normal;
            text-transform: none;
            overflow: hidden;
          }
        }
      }
    }
  }

  .center-box {
    .bg1 {
      background: url('/src/assets/image/complaintHandling/组 43209.png') no-repeat center 100%;
      // height: 161px;
    }

    .bg2 {
      background: url('/src/assets/image/complaintHandling/组 43221.png') no-repeat center 100%;
    }

    .item1-title {
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: 700;
      font-size: 34px;
      color: #FFFFFF;
      line-height: 60px;
      text-shadow: 0px 15px 37px rgba(0, 0, 0, 0.3);
      text-align: center;
      font-style: normal;
      text-transform: none;
    }

    .item1-con {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      padding: 0 10px;

      &>span {
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: 700;
        font-size: 36px;
        color: #FFFFFF;
        line-height: 80px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      &>div {
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: 700;
        font-size: 60px;
        color: #FFFFFF;
        line-height: 60px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .right {
        font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
        font-weight: 400;
        font-size: 32px;
        line-height: 45px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(90deg, #47D7FF 0%, #DAFDFF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .unit {
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: 700;
        font-size: 30px;
        color: #5385C4;
        line-height: 26px;
        // text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .line {
        height: 76px;
        width: 2px;
        background: url('/src/assets/image/complaintHandling/Vector 615.png') no-repeat center;
        margin: 0 20px;
      }
    }

    .c-box-2 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 21px;
      grid-template-rows: repeat(2, 1fr);
      padding: 35px;

      &>.item {
        background: url('/src/assets/image/complaintHandling/组 43227.png') no-repeat;

        .title {
          font-family: Source Han Sans, Source Han Sans;
          font-weight: 400;
          font-size: 24px;
          color: #E0F1FF;
          line-height: 40px;
          text-align: center;
          font-style: normal;
          text-transform: none;
          margin-bottom: 20px;
        }

        .count {
          font-family: D-DIN, D-DIN;
          font-weight: 700;
          font-size: 46px;
          color: #FFFFFF;
          line-height: 65px;
          text-align: center;
          font-style: normal;
          text-transform: none;

          >span {
            font-size: 40px;
            font-weight: 300;
            margin-left: 10px;
          }
        }
      }
    }

    .c-box-3 {
      padding-top: 20px;

      &>div {
        margin: auto;
        display: flex;
        align-items: center;

        .name {
          margin-left: 46px;
          font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
          font-weight: 400;
          font-size: 30px;
          color: #E0F1FF;
          line-height: 42px;
          text-align: left;
          font-style: normal;
          text-transform: none;
          flex: 1;
        }

        .count {
          width: 250px;
          font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
          font-weight: 400;
          font-size: 30px;
          color: #E0F1FF;
          line-height: 42px;
          text-align: left;
          font-style: normal;
          text-transform: none;

          &>span {
            font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
            font-weight: 700;
            font-size: 30px;
            color: #E0F1FF;
            line-height: 42px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            margin-left: 13px;
          }
        }

        >.unit {
          width: 128px;
          font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
          font-weight: 400;
          font-size: 30px;
          color: #10FCFF;
          line-height: 42px;
          text-align: right;
          font-style: normal;
          text-transform: none;
          margin-right: 40px;
        }
      }

      &>.item {
        width: 1119px;
        height: 76px;
        background: rgba(57, 164, 230, .2);
      }

      &>.item2 {
        width: 1119px;
        height: 76px;
        background: rgba(57, 164, 230, .1);
      }
    }

    .l-box-3 {
      &>.con {
        margin-top: 25px;

        .item {
          height: 52px;
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          background: url('/src/assets/image/complaintHandling/矩形 3666.png') no-repeat center;
          padding-left: 18px;
          padding-right: 40px;

          .icon {
            width: 36px;
            height: 36px;
            font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
            font-weight: 700;
            font-size: 30px;
            color: #FFFFFF;
            line-height: 36px;
            text-align: center;
            font-style: normal;
            text-transform: none;
            margin-right: 11px;
          }

          .i1 {
            background: url('/src/assets/image/complaintHandling/多边形 2.png') no-repeat center;
          }

          .i2 {
            background: url('/src/assets/image/complaintHandling/多边形 3.png') no-repeat center;
          }

          .i3 {
            background: url('/src/assets/image/complaintHandling/多边形 4.png') no-repeat center;
          }

          .i4 {
            background: url('/src/assets/image/complaintHandling/多边形 5.png') no-repeat center;
          }

          .name {
            font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
            font-weight: 700;
            font-size: 32px;
            line-height: 45px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            background: linear-gradient(180deg, #9FE4FF 0%, #9FD7FF 21%, #EAF8FF 85%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .count {
            font-family: D-DIN Condensed, D-DIN Condensed;
            font-weight: 400;
            font-size: 34px;
            color: #10FCFF;
            line-height: 48px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            margin-right: 8px;
          }

          .unit {
            font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
            font-weight: 400;
            font-size: 30px;
            // background: linear-gradient(0deg, #193654 0%, rgba(25, 54, 84, 0) 100%);
            color: #193654;
            line-height: 42px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            // -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
          }
        }
      }
    }

    .l-box-4 {
      &>.con {
        width: 514px;
        background: url('/src/assets/image/complaintHandling/组 43208.png') no-repeat 100%;
      }
    }

    .l-box-5 {
      .con {
        &>div {
          width: 570px;
          // height: 52px;
          margin-top: 20px;

          .title {
            background: linear-gradient(90deg, #193654 0%, rgba(25, 54, 84, 0) 100%);
            height: 52px;
            display: flex;
            align-items: center;
            padding: 0 33px;

            .name {
              font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
              font-weight: 700;
              font-size: 32px;
              // line-height: 45px;
              text-align: left;
              font-style: normal;
              text-transform: none;
              background: linear-gradient(180deg, #9FE4FF 0%, #9FD7FF 21%, #EAF8FF 85%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              flex: 1;
            }

            .count {
              font-family: D-DIN Condensed, D-DIN Condensed;
              font-weight: 400;
              font-size: 34px;
              color: #10FCFF;
              line-height: 40px;
              text-align: left;
              font-style: normal;
              text-transform: none;
              margin-right: 7px;
            }

            .unit {
              font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
              font-weight: 400;
              font-size: 30px;
              color: #FFFFFF;
              line-height: 45px;
              text-align: left;
              font-style: normal;
              text-transform: none;
            }
          }

          .des {
            display: none;
          }
        }

        .active {
          .title {
            background: linear-gradient(90deg, #26517D 0%, rgba(38, 81, 125, 0) 100%);
          }

          .des {
            padding: 0 30px;
            display: block;
            height: 141px;
            background: rgba(25, 54, 84, .5);
            font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
            font-weight: 400;
            font-size: 30px;
            color: #FFFFFF;
            line-height: 70px;
            text-align: justify;
            font-style: normal;
            text-transform: none;
            overflow: hidden;
          }
        }
      }
    }
  }

  .right-box {
    .r-box-1 {
      padding: 0px;

      &>div {
        height: 100%;
        align-items: center;
        justify-content: space-around;
        padding-left: 10px;
        padding-right: 10px;

        .info-box {
          padding: 0 20px;
          align-items: center;

          .item {
            &>div {
              align-items: center;
              justify-content: space-around;
              padding-left: 20px;
              padding-right: 20px;

              .line {
                height: 60px;
                width: 2px;
                background: url('/src/assets/image/complaintHandling/Vector 615.png') no-repeat center;
                margin: 0 20px;
              }
            }
          }

          .item1 {
            &>div {
              align-items: center;
              justify-content: space-around;
              padding-left: 5px;
              padding-right: 5px;
            }
          }

          // justify-content: space-around;
          .name {
            font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
            font-weight: 700;
            font-size: 36px;
            color: #FFFFFF;
            line-height: 42px;
            text-align: center;
            font-style: normal;
            text-transform: none;
            padding-top: 35px;
          }

          .title {
            font-family: Source Han Sans, Source Han Sans;
            font-weight: 400;
            font-size: 32px;
            color: #CAE9FF;
            line-height: 42px;
            letter-spacing: 2px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }

          .line {
            height: 60px;
            width: 2px;
            background: url('/src/assets/image/complaintHandling/Vector 615.png') no-repeat center;
            margin: 0 2px;
          }

          .count {
            flex: 1;
            font-family: Impact, Impact;
            font-weight: 400;
            font-size: 38px;
            color: #00C8FF;
            line-height: 42px;
            letter-spacing: 3px;
            text-align: right;
            font-style: normal;
            text-transform: none;

            &>span {
              font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
              font-weight: 400;
              font-size: 29px;
              color: #CAE9FF;
              line-height: 40px;
              text-align: left;
              font-style: normal;
              text-transform: none;
            }
          }
        }

        .box {
          background: rgba(29, 64, 100, .5);
          border-radius: 8px 8px 8px 8px;
          border: 1px solid rgba(69, 139, 189, 0.5);
        }
      }
    }

    .r-box-4 {
      height: 100%;

      &>.e-item {
        flex: 1;

        .title {
          font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
          font-weight: 600;
          font-size: 34px;
          color: #BCE0ED;
          text-align: center;
          font-style: normal;
          text-transform: none;
        }
      }

      &>.item {
        display: flex;
        height: 67.6px;
        align-items: center;
        margin-top: 45px;

        .icon1 {
          width: 122.78px;
          height: 130.04px;
          background: url('/src/assets/image/complaintHandling/组 43210.png') no-repeat;
        }

        .icon2 {
          width: 122.78px;
          height: 130.04px;
          background: url('/src/assets/image/complaintHandling/组 43211.png') no-repeat;
        }

        .icon3 {
          width: 122.78px;
          height: 130.04px;
          background: url('/src/assets/image/complaintHandling/组 43213.png') no-repeat;
        }

        .con {
          margin-top: 30px;
          margin-left: 20px;
          width: 392.6px;
          height: 67.6px;
          display: flex;
          align-items: center;
          padding-right: 28px;
          padding-left: 34px;
          // padding: 0 28px 0 34px;
          background: url('/src/assets/image/complaintHandling/Group 456.png') no-repeat center;


          >div {
            font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
            font-weight: 400;
            font-size: 32px;
            color: #CAE9FF;
            line-height: 32px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }
        }
      }
    }

    .r-box-5 {
      justify-content: space-between;

      &>.box-1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }

      &>.box-2 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-gap: 2px;

        .item {
          display: flex;
          align-items: center;
        }
      }

      &>.box-3 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-gap: 2px;

        .item {
          display: flex;
          align-items: center;
        }
      }

      .name {
        font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
        font-weight: 400;
        font-size: 30px;
        color: #EBF6FF;
        line-height: 42px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .count {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 42px;
        color: #1FF2FF;
        line-height: 59px;
        text-align: left;
        font-style: normal;
        text-transform: none;

        &>span {
          font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
          font-weight: 400;
          font-size: 30px;
          color: #EBEBEB;
          line-height: 42px;
          text-align: left;
          font-style: normal;
          text-transform: none;
          margin-left: 10px;
        }
      }

      .icon1 {
        width: 153px;
        height: 82px;
        background: url('/src/assets/image/complaintHandling/组 43206.png') no-repeat;
      }

      .icon2 {
        width: 153px;
        height: 81px;
        background: url('/src/assets/image/complaintHandling/组 43215.png') no-repeat;
        margin-right: 10px;
      }

      .icon3 {
        width: 153px;
        height: 83px;
        background: url('/src/assets/image/complaintHandling/组 43217.png') no-repeat;
        margin-right: 10px;
      }

      .icon4 {
        width: 153px;
        height: 81px;
        background: url('/src/assets/image/complaintHandling/组 43218.png') no-repeat;
        margin-right: 10px;
      }

      .icon5 {
        width: 96.29px;
        height: 73.65px;
        background: url('/src/assets/image/complaintHandling/组 43219.png') no-repeat;
        margin-right: 25px;
      }

      .icon6 {
        width: 96.29px;
        height: 73.65px;
        background: url('/src/assets/image/complaintHandling/组 43220.png') no-repeat;
        margin-right: 25px;
      }

    }

    .table-box {
      // background: pink;
      margin-top: 10px;
      height: 400px;
      pointer-events: all;

      .ok {
        width: 120px;
        height: 46px;
        background: url('/src/assets/image/complaintHandling/ok.png') no-repeat;
        line-height: 46px;
        text-align: center;
        font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
        font-weight: 400;
        font-size: 28px;
        color: #0CE6BF;
      }

      .uok {
        width: 120px;
        height: 46px;
        background: url('/src/assets/image/complaintHandling/uok.png') no-repeat;
        line-height: 46px;
        text-align: center;
        font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
        font-weight: 400;
        font-size: 28px;
        color: #F19049;
      }

      :deep(.el-table) {
        --el-bg-color: transparent;
        --el-table-bg-color: transparent;
        --el-table-header-text-color: #A5C1CC;
        font-size: 30px;
        --el-table-border: 2px solid #26495B;
        --el-table-text-color: #AEB8C0;
        --el-table-row-hover-bg-color: none;

        .el-table__header-wrapper {
          border-bottom: 4px solid #549FE5;

          .cell {
            line-height: 48px;
          }
        }

        th {
          font-weight: 700;
        }

        .cell {
          line-height: 68px;
        }
      }
    }
  }

  .up {
    position: relative;
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 500;
    font-size: 32px;
    color: #32F48A;
    line-height: 45px;
    text-align: right;
    font-style: normal;
    text-transform: none;
    -webkit-text-fill-color: #32F48A;

    &::after {
      position: absolute;
      content: '';
      background: url('/src/assets/image/complaintHandling/路径 (1).png') no-repeat;
      height: 14.41px;
      width: 10.16px;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 10px;
    }
  }

  .down {
    position: relative;
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 500;
    font-size: 32px;
    color: #E54E4E;
    line-height: 45px;
    text-align: right;
    font-style: normal;
    text-transform: none;
    -webkit-text-fill-color: #E54E4E;

    &::after {
      position: absolute;
      content: '';
      background: url('/src/assets/image/complaintHandling/路径.png') no-repeat;
      height: 14.41px;
      width: 10.16px;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 10px;
    }
  }

  &>div {
    flex: 1;
  }

  .title-box {
    display: flex;
    align-items: center;
    position: relative;

    .nub {
      font-family: STCaiyun, STCaiyun;
      font-weight: 400;
      font-size: 88px;
      line-height: 110px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(180deg, #FFFFFF 0%, #4DB1F1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-right: 28px;
    }

    .name {
      font-family: 庞门正道标题体免费版, 庞门正道标题体免费版;
      font-weight: 400;
      font-size: 66px;
      line-height: 79px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(180deg, #FFFFFF 0%, #46AEF1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .line {
      background: linear-gradient(225deg, rgba(35, 103, 157, 0) 0%, #23679D 100%);
      flex: 1;
      height: 4px;
      margin-left: 59px;
      position: relative;

      &>.head {
        position: absolute;
        top: 3px;
        left: 0;
        width: 94px;
        height: 7px;
        background: #58B5FF;
      }
    }

    .tip-box {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: 700;
      font-size: 32px;
      color: #5385C4;
      line-height: 26px;
      text-align: center;
      font-style: normal;
      text-transform: none;

      &>div {
        margin: 0 30px;
        pointer-events: all;
      }

      &>.active {
        font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
        font-weight: 700;
        font-size: 32px;
        color: #FFFFFF;
        // line-height: 45px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }

  .item-box {
    display: flex;
  }

  .jcsb {
    justify-content: space-between;
  }

  .bg-box {
    background: linear-gradient(180deg, rgba(57, 122, 153, 0.1836) 0%, rgba(15, 46, 57, 0.0702) 100%);
    box-shadow: inset 0px 0px 39px 0px rgba(97, 189, 255, 0.2);
    border-radius: 20px;
    padding: 20px 50px;
    position: relative;


    &>.title {
      &::after {
        content: '';
        width: 33.98px;
        height: 43.68px;
        background: url('/src/assets/image/complaintHandling/组 43222.png');
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      padding-left: 60px;
      position: relative;
      font-family: Alibaba PuHuiTi 3.0,
      Alibaba PuHuiTi 30;
      font-weight: 700;
      font-size: 50px;
      color: #F2FEFF;
      line-height: 70px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      z-index: 9;

      &::before {
        position: absolute;
        content: '';
        height: 41px;
        width: 1028px;
        bottom: 5px;
        left: 0;
        z-index: -1;
        background: url('/src/assets/image/complaintHandling/Rectangle 295.png') no-repeat center/cover;
      }
    }

    &>.title1 {
      &::after {
        content: '';
        width: 33.98px;
        height: 43.68px;
        background: url('/src/assets/image/complaintHandling/组 43222.png');
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      padding-left: 60px;
      position: relative;
      font-family: Alibaba PuHuiTi 3.0,
      Alibaba PuHuiTi 30;
      font-weight: 700;
      font-size: 50px;
      color: #F2FEFF;
      line-height: 70px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      z-index: 9;

      &::before {
        position: absolute;
        content: '';
        height: 41px;
        width: 578.52px;
        bottom: 5px;
        left: 0;
        z-index: -1;
        background: url('/src/assets/image/complaintHandling/Rectangle 297.png') no-repeat center/cover;
      }
    }

    &>.title2 {
      &::after {
        content: '';
        width: 33.98px;
        height: 43.68px;
        background: url('/src/assets/image/complaintHandling/组 43222.png');
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      padding-left: 60px;
      position: relative;
      font-family: Alibaba PuHuiTi 3.0,
      Alibaba PuHuiTi 30;
      font-weight: 700;
      font-size: 50px;
      color: #F2FEFF;
      line-height: 70px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      z-index: 9;

      &::before {
        position: absolute;
        content: '';
        height: 41px;
        width: 1233px;
        bottom: 5px;
        left: 0;
        z-index: -1;
        background: url('/src/assets/image/complaintHandling/Rectangle 291.png') no-repeat center/cover;
      }
    }
  }

  .info-box {
    background: rgba(39, 79, 121, 0.2);
    box-shadow: inset 0px 4px 20px 0px rgba(69, 139, 214, 0.7);
    border-radius: 10px 10px 10px 10px;
    // min-height: 50px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 27px;
    position: relative;
    // width: 100%;
  }
}
</style>
