
# tank-vue.js
### 簡介
小時候在wii上玩過類似的遊戲，因此想要在電腦上實現遊玩，玩法改成雙人對戰，可與朋友一起同樂。並可自行調整遊戲參數，提升遊玩性。

### 架構

遊戲使用html, css, javascript搭配vue.js框架完成。
- #### vue.js
    在vue框架中，可將data binding在元素上，舉例來說:

```
<template>
  <div
    id="tank1"
    class="tanks"
    ref="tank1"
    v-bind:style="{marginLeft: this.tank.x+'px',marginTop: this.tank.y+'px',height: this.tank.height+'px',width:this.tank.width+'px', backgroundColor: this.tank.color}"
  >
    <div id="tank1_cannon" v-bind:style="{transform:'rotate('+this.cannon.deg+'deg)'}">
      <div id="cannon_top"></div>
    </div>
    <h5 id="name">{{tank.name}}</h5>
  </div>
</template>
<script>
    var moveCannonTime;
    var moveTankTime;
    import moveTank from "../mixins/moveTank";
    import moveCannon from "../mixins/moveCannon";
    import collision from "../mixins/collision";
    export default {
      name: "tank1",
      data() {
        return {};
      },
      methods: {},
      computed: {
        bullet: function() {
          return this.$store.state.bullet1;
        },
        tank: function() {
          return this.$store.state.tank1.tank;
        },
        cannon: function() {
          return this.$store.state.tank1.cannon;
        },
        opponent: function() {
          return this.$store.state.tank2;
        }
      },
      mixins: [moveTank, moveCannon, collision],
      created() {
        moveCannonTime = setInterval(() => this.moveCannon(), 10);
        moveTankTime = setInterval(() => this.moveTank(), 10);
      },
      beforeDestroy() {
        window.clearInterval(moveCannonTime);
        window.clearInterval(moveTankTime);
      }
    };
    </script>
    <style scoped>
    #tank1 {
      border-color: rgb(0, 71, 0);
    }
    #cannon_top {
      z-index: 100;
      border-radius: 50%;
      position: relative;
      left: 50%;
      top: calc(-50% - 5px);
      height: 50px;
      width: 50px;
      background-color: rgb(26, 68, 26);
      margin: 0 auto;
    }
    #tank1_cannon {
      border-radius:15px;
      transform-origin: right center;
      position: relative;
      top: calc(50% - 10px);
      left: -50%;
      z-index: 50;
      height: 20px;
      width: 80px;
      background-color: black;
      margin: 0 auto;
    }
    #name {
      top: 110%;
      left: 16%;
      font-size: x-large;
      position: absolute;
      margin: 0 auto;
      text-align: center;
    }
      </style>`

```    
這段程式碼就是拿來控制其中一台坦克的，在這個檔案內會有跟它相關的function,data和style，操作元素和取得資料非常方便。

- ### jquery
    利用jquery來實現fadeIn(), fadeOut()等功能，提升遊戲質感。
    
- ### css
    用在指定座標、顏色、尺寸等
- ### html
    多使用到div和button，當作物件來做移動、選取等操作
    
## 完成功能
- ### 坦克移動
     利用css的margin-left和margin-top來控制div的位置。配合key-event可達成控制方向。
- ### 碰撞機制
     利用座標和坦克半徑來判斷是否碰撞到牆或是敵方坦克。
- ### 砲管旋轉
     利用css的translate特性來實現div旋轉。
- ### 發射
     將上述旋轉的角度記下，透過三角函數轉換為飛行向量，使子彈朝指定方向飛行。
- ### 子彈碰撞
     利用子彈座標和敵方座標距離判定，若碰撞則判定為擊中。
     用同樣方法來判定是否碰撞到牆。
- ### 擊中
     被判定為擊中後，坦克會減少血量並進入一段無敵的復活時間，以維持遊戲平衡，這邊使用邏輯來使敵方無法擊中，並用setInterval來產生復活的閃爍動畫。
- ### 切換武器
     按下切換武器鍵時，利用css改變子彈外觀，同時改變其移動速度、尺寸、傷害等，提升遊玩性，目前總共有三種武器可以選。
- ### 地雷
     地雷為較特殊的武器，它利用與敵方距離來判斷是否觸發引爆，也可以手動引爆。在引爆前會利用setTimeout和setInterval來閃爍引爆警示，非常炫炮。
- ### 地圖
     地圖使用我寫好的模板，方便快速開發、新增牆壁等。其中特別的是地圖三的縮小機制，利用setInterval來慢慢縮小地圖，非常刺激有趣!
- ### 寶物
     寶物利用setInterval和random隨機在地圖上生成，撿到可以加分，提升遊玩性。
- ### 參數調整
    資料都動態操作，給玩家調整參數的空間，自己平衡遊戲!
## 資訊呈現
- ### 特效
    轉場皆使用淡出淡入提升質感
- ### 開始畫面
    坦克草圖搭上金屬色的enter按鈕給玩家充足的帶入感
- ### 選擇地圖頁
    地圖選擇按鈕富有設計感，也提供了充足的說明頁面，像操作說明和規則等。
- ### 遊玩畫面
    畫面顏色溫和不傷眼。另外上方資訊攔可以看到選擇的武器、子彈數、血量和分數等，非常的完整。
