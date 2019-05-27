<template>
  <div class="alarm-dialog">
    <el-dialog title="报警类型新增/修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="报警类型编码" prop="plValue">
          <el-input v-model="form.plValue" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="报警类型名称" prop="plDisplay">
          <el-input v-model="form.plDisplay" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="报警类型排序" prop="plSort">
          <el-input v-model="form.plSort" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="报警类型备注" prop="plRemark">
          <el-input v-model="form.plRemark" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="报警类型级别" prop="plWarnLevel">
          <el-select v-model="form.plWarnLevel" placeholder="请选择活动区域">
            <el-option label="1级" value="1"></el-option>
            <el-option label="2级" value="2"></el-option>
            <el-option label="3级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报警类型状态" prop="plIsvalid">
          <el-select v-model="form.plIsvalid" placeholder="请选择活动区域">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOperation('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
// import moment from 'moment';
import {alarmManageCheck, alarmManageAdd} from 'server/interface';
export default {
  name: 'alarmManagement',
  props: {
    rowData: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        plValue: '',
        plWarnLevel: '',
        plDisplay: '',
        plSort: '',
        plRemark: '',
        plIsvalid: ''
      },
      trigger: 'change',
      rules: {
        plValue: [
          { required: true, message: '请输入报警编码', trigger: 'change' }
        ],
        plWarnLevel: [
          { type: 'string', required: true, message: '请选择一个报警等级', trigger: 'change' }
        ],
        plIsvalid: [
          { type: 'string', required: true, message: '请选择报警船台', trigger: 'change' }
        ],
        plSort: [
          { required: true, message: '请填写排序数字', trigger: 'change' }
        ],
        plDisplay: [
          { required: true, message: '请填写报警名称', trigger: 'change' }
        ],
        plRemark: [
          { required: true, message: '请填写备注', trigger: 'change' }
        ]
      },
      dialogFormVisible: false
    };
  },
  components: {
  },
  mounted () {
  },
  watch: {
    rowData: {
      deep: true,
      handler () {
        this.form = this.rowData;
      }
    }
  },
  methods: {
    handleOperation (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (!this.form.plUuid) {
            alarmManageAdd('warntype/create', this.form).then(res => {
              if (res.data.head.code === '200') {
                this.$message.success('创建成功');
                this.$emit('updateTable');
                this.dialogFormVisible = false;
              }
            });
          } else {
            console.log(this.form);
            alarmManageCheck('warntype/update', this.form).then(res => {
              if (res.data.head.code === '200') {
                this.$message.success('修改成功');
                this.$emit('updateTable');
                this.dialogFormVisible = false;
              }
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>
