<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Show Student</h1>
            <div class="row">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table table-info">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="student in Students" :key="student._id">
                                    <td scope="row">{{ student.name }}</td>
                                    <td>{{ student.email }}</td>
                                    <td>{{ student.phone }}</td>
                                    <td> <router-link :to="{ name: 'edit', params: { id: student._id }}"
                                            class="btn btn-success">
                                            Edit
                                        </router-link>
                                        <button @click.prevent="deleteStudent(student._id)" 
                                            class="btn btn-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            Students: []
        }
    },
    created() {
        let apiURL = 'http://localhost:4000/api';
        axios.get(apiURL).then(res => {
            this.Students = res.data
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        deleteStudent(id) {
            let apiURL = `http://localhost:4000/api/delete-student/${id}`;
            let indexOfArrayItem = this.Students.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.Students.splice(indexOfArrayItem, 1)
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
}
</script>