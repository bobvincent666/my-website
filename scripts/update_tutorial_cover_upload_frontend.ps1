$frontendRoot = "C:\Users\baoba\develop\Web\website_front_end"
$apiPath = Join-Path $frontendRoot "src\api\content\tutorialUpload.js"
$viewPath = Join-Path $frontendRoot "src\views\content\tutorial\list.vue"

$apiContent = @'
import request from '@/utils/request'

export function uploadTutorialMarkdown(file) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: '/admin/content/tutorial/upload/markdown',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function uploadTutorialCoverImage(file) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: '/admin/content/tutorial/upload/image',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
'@

$viewContent = @'
<template>
  <div class="app-container">
    <div class="search-div">
      <el-form label-width="90px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="Title">
              <el-input v-model="searchObj.title" placeholder="Tutorial title" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Path">
              <el-input v-model="searchObj.path" placeholder="Tutorial path" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Status">
              <el-select v-model="searchObj.status" clearable placeholder="All" style="width: 100%">
                <el-option :value="1" label="Enabled" />
                <el-option :value="0" label="Disabled" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display: flex">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">Search</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">Reset</el-button>
        </el-row>
      </el-form>
    </div>

    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" :disabled="$hasBP('bnt.contentTutorial.add') === false" @click="add">Add</el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" stripe border style="width: 100%; margin-top: 10px;">
      <el-table-column label="No." width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="Cover" width="120" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.coverImage" :src="imageUrl(scope.row.coverImage)" class="cover-thumb">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Title" min-width="220" show-overflow-tooltip />
      <el-table-column prop="path" label="Path" width="220" show-overflow-tooltip />
      <el-table-column prop="tone" label="Tone" width="110" />
      <el-table-column label="Markdown" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.markdownPath ? 'success' : 'info'">
            {{ scope.row.markdownPath ? 'Yes' : 'No' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Featured" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="Number(scope.row.featured) === 1 ? 'warning' : 'info'">
            {{ Number(scope.row.featured) === 1 ? 'Yes' : 'No' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Status" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="statusTag(scope.row.status)">{{ Number(scope.row.status) === 1 ? 'Enabled' : 'Disabled' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="140" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" :disabled="$hasBP('bnt.contentTutorial.update') === false" @click="edit(scope.row.id)" />
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="$hasBP('bnt.contentTutorial.remove') === false" @click="removeDataById(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

    <el-dialog :title="form.id ? 'Edit Tutorial' : 'Add Tutorial'" :visible.sync="dialogVisible" width="75%">
      <el-form ref="dataForm" :model="form" :rules="rules" label-width="120px" size="small">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="Title" prop="title">
              <el-input v-model="form.title" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Path" prop="path">
              <el-input v-model="form.path" placeholder="/tutorials/your-article-slug" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="Published">
              <el-input v-model="form.publishedLabel" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Cover Image">
              <el-input v-model="form.coverImage" placeholder="/uploads/tutorial-images/xxx.jpg">
                <el-upload slot="append" :show-file-list="false" :http-request="uploadCover" action="">
                  <el-button icon="el-icon-upload">Upload</el-button>
                </el-upload>
              </el-input>
              <img v-if="form.coverImage" :src="imageUrl(form.coverImage)" class="cover-preview">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="Tone">
              <el-input v-model="form.tone" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Featured">
              <el-radio-group v-model="form.featured">
                <el-radio :label="1">Yes</el-radio>
                <el-radio :label="0">No</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Status">
              <el-radio-group v-model="form.status">
                <el-radio :label="1">Enabled</el-radio>
                <el-radio :label="0">Disabled</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="Sort">
              <el-input-number v-model="form.sortValue" :min="0" controls-position="right" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Summary">
          <el-input v-model="form.summary" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="Markdown File">
          <el-input v-model="form.markdownPath" placeholder="/uploads/tutorial-markdown/xxx.md">
            <el-upload slot="append" :show-file-list="false" :http-request="uploadMarkdown" action="">
              <el-button icon="el-icon-upload">Upload</el-button>
            </el-upload>
          </el-input>
          <div class="field-tip">If a markdown file is uploaded, the portal will render that file directly. Otherwise it will use the structured overview and JSON sections below.</div>
        </el-form-item>
        <el-form-item label="Overview">
          <el-input v-model="form.overview" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item label="Categories JSON" prop="categoriesJson">
          <el-input v-model="form.categoriesJson" type="textarea" :rows="5" />
        </el-form-item>
        <el-form-item label="Sections JSON">
          <el-input v-model="form.sectionsJson" type="textarea" :rows="8" />
        </el-form-item>
        <el-form-item label="References JSON">
          <el-input v-model="form.referencesJson" type="textarea" :rows="5" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" size="small" @click="saveOrUpdate">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/content/tutorial'
import { uploadTutorialCoverImage, uploadTutorialMarkdown } from '@/api/content/tutorialUpload'
import { formatStatusTag, mapJsonFieldsForForm, parseJsonFieldsForSubmit } from '@/utils/content-admin'

const jsonDefaults = {
  categoriesJson: '[]',
  sectionsJson: '[]',
  referencesJson: '[]'
}

const defaultForm = {
  path: '',
  title: '',
  summary: '',
  publishedLabel: '',
  categoriesJson: '[]',
  coverImage: '',
  tone: '',
  featured: 0,
  markdownPath: '',
  overview: '',
  sectionsJson: '[]',
  referencesJson: '[]',
  sortValue: 0,
  status: 1
}

export default {
  data() {
    return {
      listLoading: false,
      list: [],
      total: 0,
      page: 1,
      limit: 10,
      searchObj: {},
      dialogVisible: false,
      form: Object.assign({}, defaultForm),
      rules: {
        title: [{ required: true, message: 'Please input title', trigger: 'blur' }],
        path: [{ required: true, message: 'Please input path', trigger: 'blur' }],
        categoriesJson: [{ required: true, message: 'Please input categories JSON', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    imageUrl(url) {
      return url && url.startsWith('/uploads/') ? `${process.env.VUE_APP_BASE_API}${url}` : url
    },
    statusTag(status) {
      return formatStatusTag(status)
    },
    fetchData(page = 1) {
      this.page = page
      this.listLoading = true
      api.getPageList(this.page, this.limit, this.searchObj).then((response) => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },
    add() {
      this.dialogVisible = true
      this.form = Object.assign({}, defaultForm)
    },
    edit(id) {
      this.dialogVisible = true
      api.getById(id).then((response) => {
        this.form = mapJsonFieldsForForm(response.data, jsonDefaults)
      })
    },
    saveOrUpdate() {
      this.$refs.dataForm.validate((valid) => {
        if (!valid) {
          return
        }
        let payload
        try {
          payload = parseJsonFieldsForSubmit(this.form, jsonDefaults)
        } catch (error) {
          this.$message.error(`Invalid JSON field: ${error.message}`)
          return
        }

        const hasStructuredContent = payload.overview || payload.sectionsJson !== '[]'
        const hasMarkdownContent = payload.markdownPath && String(payload.markdownPath).trim() !== ''
        if (!hasStructuredContent && !hasMarkdownContent) {
          this.$message.error('Please provide markdown content or structured tutorial content')
          return
        }

        const request = payload.id ? api.updateById(payload) : api.save(payload)
        request.then(() => {
          this.$message.success('Saved successfully')
          this.dialogVisible = false
          this.fetchData(this.page)
        })
      })
    },
    uploadCover(param) {
      uploadTutorialCoverImage(param.file).then((res) => {
        this.form.coverImage = res.data.url
        this.$message.success('Uploaded successfully')
      })
    },
    uploadMarkdown(param) {
      uploadTutorialMarkdown(param.file).then((res) => {
        this.form.markdownPath = res.data.url
        this.$message.success('Uploaded successfully')
      })
    },
    removeDataById(id) {
      this.$confirm('Delete this record?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        return api.removeById(id)
      }).then(() => {
        this.$message.success('Deleted successfully')
        this.fetchData(this.page)
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.cover-thumb {
  width: 72px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.cover-preview {
  display: block;
  width: 180px;
  height: 112px;
  margin-top: 12px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #dbe3f0;
}

.field-tip {
  margin-top: 8px;
  color: #64748b;
  font-size: 12px;
  line-height: 1.5;
}
</style>
'@

Set-Content -Path $apiPath -Value $apiContent -Encoding UTF8
Set-Content -Path $viewPath -Value $viewContent -Encoding UTF8
