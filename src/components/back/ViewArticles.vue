<template>
  <div class="view-articles">
    <div class="wrapper">
      <div class="main">
        <div class="page-title">
          浏览文章
        </div>
        <div class="view-main">
          <table class="view-table">
            <tr>
              <th>文章标题</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
            <tr>
              <td>ES6学习笔记</td>
              <td>2016年12月15日</td>
              <td>
                <button type="button" name="button" class="btn view-btn">查看</button>
                <button type="button" name="button" class="btn change-btn">修改</button>
                <button type="button" name="button" class="btn del-btn">删除</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewArticles'
}
</script>

<style scoped>
  .view-articles {
    width: 100%;
    float: left;
    color: #3c3c3c;

    .wrapper {
      margin-left: 300px;

      .main {
        margin: 30px 50px;
        background-color: white;
        border-radius: 2px;
        box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
        text-align: left;

        .page-title {
          width: 100%;
          background-color: rgb(232, 232, 232);
          line-height: 56px;
          color: rgba(0, 0, 0, 0.4);
          font-size: 20px;
          padding-left: 24px;
        }

        .view-main {
          padding: 20px 30px 40px 30px;

          .view-table {
            width: 100%;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.4);
            border-collapse: collapse;

            tr {
              border-bottom: 1px solid rgb(228, 228, 228);

              td, th {
                padding: 15px 25px;
                font-weight: normal;
              }

              td {
                color: #3c3c3c;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              &:last-child {
                border-bottom: none;
              }

              .btn {
                border: none;
                background-color: rgb(0, 171, 255);
                padding: 5px 15px;
                color: white;
                border-radius: 2px;
                box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
                cursor: pointer;
                outline: none;
                transition: background-color .3s ease;

                &:hover {
                  background-color: rgb(0, 151, 255);
                }

                &:active {
                  background-color: rgb(0, 131, 255);
                }
              }

              .del-btn {
                background-color: rgb(235, 60, 60);

                &:hover {
                  background-color: rgb(215, 60, 60);
                }

                &:active {
                  background-color: rgb(175, 60, 60);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
