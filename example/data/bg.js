export default {
  showType: 'background',
  elements: [
    {
      name: "bg",
      x: 0,
      y: 0,
      w: 16000,
      h: 12000,
      angle: 0,
      type: "html",
      // lock: true,
      desc: {
        width: 860,
        height: 640,
        html: `<style>
        .solar-system {
          position: relative;
          height: 640px;
          width: 860px;
          transition: all 0.09s ease-in;
          overflow: hidden;
          background: #080e24;
          color: #626668;
        }
        .solar-system .star-item {
          display: block;
          position: absolute;
          border: 2px solid #394057;
        }
        .solar-system .star-item .star-entity {
            display: block;
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 5px;
        }
       
        .solar-system .sun {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            background: #fc3;
            background-image: -webkit-gradient(
                divnear,
                left bottom,
                left top,
                color-stop(0.22, rgb(204,153,0)),
                color-stop(1, rgb(255,219,112))
            );
            background-image: -moz-divnear-gradient(
                center bottom,
                rgb(204,153,0) 22%,
                rgb(255,219,112) 100%
            );
            top: 302px;
            left: 462px;
            border: none;
            box-shadow: 0 0 50px #c90;
            z-index: 100;
            transition: all 0.2s ease-in;
        }
        .solar-system .mercury {
            width: 100px;
            height: 100px;
            border-radius: 52px;
            top: 270px;
            left: 430px;
            z-index: 99;
        }
        .solar-system .mercury .star-entity {
            background: #b6bac5;
            top: 10px;
            left: 10px;
        }
        .solar-system .venus {
            width: 160px;
            height: 160px;
            border-radius: 82px;
            top: 240px;
            left: 400px;
            z-index: 98;
        }
        .solar-system .venus .star-entity {
            background: #bf8639;
            top: 118px;
            left: 5px;
        }
        .solar-system .earth {
            width: 220px;
            height: 220px;
            border-radius: 112px;
            top: 210px;
            left: 370px;
            z-index: 97;
        }
        .solar-system .earth .star-entity {
            background: #06c;
            top: 56px;
            left: 5px;
        }
        .solar-system .earth .star-entity.moon {
            width: 4px;
            height: 4px;
            border-radius: 2px;
            background: #ccc;
            top: 12px;
            left: 12px;
        }
        .solar-system .mars {
            width: 280px;
            height: 280px;
            border-radius: 142px;
            top: 180px;
            left: 340px;
            z-index: 96;
        }
        .solar-system .mars .star-entity {
            background: #aa4200;
            top: 0px;
            left: 175px;
        }
        .solar-system .asteroids_meteorids {
          top: 155px;
          left: 315px;
          z-index: 1;
          background: url(data:image/png;base64,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) no-repeat 0 0;
          width: 330px;
          height: 330px;
          border-radius: 165px;
          border: none;
        }
        .solar-system .jupiter {
          width: 340px;
          height: 340px;
          border-radius: 172px;
          top: 150px;
          left: 310px;
          z-index: 95;
        }
        .solar-system .jupiter .star-entity {
          background: #e0ae6f;
          top: 67px;
          left: 24px;
        }
        .solar-system .saturn {
          width: 400px;
          height: 400px;
          border-radius: 202px;
          top: 120px;
          left: 280px;
          z-index: 94;
        }
        .solar-system .saturn .star-entity {
          background: #dfd3a9;
          top: 24px;
          left: 300px;
        }
        .solar-system .saturn .star-entity.ring {
          width: 12px;
          height: 12px;
          border-radius: 8px;
          background: none;
          border: 2px solid #5a4e34;
          left: -3px;
          top: -3px;
          transform: skewY(50deg);
        }
        .solar-system .uranus {
          width: 460px;
          height: 460px;
          border-radius: 232px;
          top: 90px;
          left: 250px;
          z-index: 93;
        }
        .solar-system .uranus .star-entity {
          background: #82b3d1;
          top: 7px;
          left: 300px;
        }
        .solar-system .neptune {
          width: 520px;
          height: 520px;
          border-radius: 262px;
          top: 60px;
          left: 220px;
          z-index: 92;
        }
        .solar-system .neptune .star-entity {
          background: #77c2ec;
          top: 0px;
          left: 200px;
        }
        .solar-system .pluto {
          width: 580px;
          height: 580px;
          border-radius: 292px;
          top: 30px;
          left: 190px;
          z-index: 91;
        }
        .solar-system .pluto .star-entity {
          background: #7c6a5c;
          top: 79px;
          left: 79px;
        }
        
      </style>
      <div >
        <div class="solar-system">
          <div class="star-item sun"></div>
          <div class="star-item mercury">
            <span class="star-entity"></span>
          </div>
          <div class="star-item venus">
            <span  class="star-entity"></span>
          </div>
          <div class="star-item earth">
            <span class="star-entity">
              <span class="star-entity moon"></span>
            </span>
          </div>
          <div class="star-item mars">
            <span class="star-entity"></span>
          </div>
          <div class="star-item asteroids_meteorids">
            <span class="star-entity"></span>
          </div>
          <div class="star-item jupiter">
            <span class="star-entity"></span>
          </div>
          <div class="star-item saturn">
            <span class="star-entity">
              <span class="star-entity ring"></span>
            </span>
          </div>
          <div class="star-item uranus">
            <span class="star-entity"></span>
          </div>
          <div class="star-item neptune">
            <span class="star-entity"></span>
          </div>
          <div class="star-item pluto">
            <span class="star-entity"></span>
          </div>
        </div>
      </div>`
      },
    },
    {
      name: "text",
      x: 10,
      y: 10,
      w: 300,
      h: 100,
      angle: 0,
      type: "text",
      desc: {
        text: 'Solar System',
        color: "#f0f0f0",
        fontSize: 40,
        textAlign: 'center',
      },
    },
  ]
}