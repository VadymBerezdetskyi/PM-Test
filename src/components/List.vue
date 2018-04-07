<template>
  <el-container class="list-container">
    <el-aside width="200px">
      <el-row :type="'flex'" class="list-logout-row"> 
        <el-button type="danger" @click="logout">Log out</el-button> 
      </el-row>
    </el-aside>
    <el-main>
      <el-table :data="tableData" style="width: 100%" height="515px">
        <el-table-column
          prop="name"
          label="Name">
        </el-table-column>
        <el-table-column
          prop="contact[email]"
          label="Email">
        </el-table-column>
        <el-table-column
          prop="contact[phoneNumber]"
          label="Phone number">
        </el-table-column>
        <el-table-column
          prop="contact[countryCode]"
          label="Country code">
        </el-table-column>
        <el-table-column
          prop="members[length]"
          label="Organizations">
        </el-table-column>
        <el-table-column
          prop="banExpiryDate"
          label="Ban expiry date">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="Created at">
        </el-table-column>
      </el-table>
      <div class="list-total-pagination">
        <span> {{ `Total: ${this.totalRecords}` }} </span>
        <el-pagination
          background
          layout="prev, pager, next"
          :total= this.totalRecords
          @current-change="changePage">
        </el-pagination>
      </div>      
      <span v-if="notFound">404: NOT FOUND</span>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      notFound: false,
      tableData: [],
      totalRecords: 0,
    }
  },
  methods: {
    logout(){
      this.$router.replace('/');
      this.$cookie.delete('token');
    },
    changePage(a){
      console.log(a);
      this.$http.post("https://reb-sandbox.sdk.finance/api/v1/users/view", {
      "pageNumber": a - 1,
      "pageSize": 10
      }, {
      headers: {
        Authorization: `TOKEN ${this.$cookie.get('token')}` 
      }
      }).then(({body, ok, status}) => {
      if (status === 200 && ok === true) {
        this.tableData = body.records;
      }
      }).catch((err) => {
      this.notFound = true;
      })
    }
  },
  created(){   
    this.$http.post("https://reb-sandbox.sdk.finance/api/v1/users/view", {
      "pageNumber": 0,
      "pageSize": 10
    }, {
      headers: {
        Authorization: `TOKEN ${this.$cookie.get('token')}` 
      }
    }).then(({body, ok, status}) => {
      if (status === 200 && ok === true) {
        this.tableData = body.records;
        this.totalRecords = body.totalRecords;
      }
    }).catch((err) => {
      this.notFound = true;
    })
  }
}
</script>

<style scoped>
.list-container {
  height: 90%;
}

.el-main {
  margin-right: 60px;
  margin-top: 15px;
  height: 100%;
  padding: 0;
}

.list-logout-row {
  justify-content: center;
}
.el-table {
  height: 90%;
}
.list-total-pagination {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 5px;
}
.el-pagination {
  display: inline;
}
.el-button{
  margin-top: 15px;
}
</style>
