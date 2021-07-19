import React from "react"
import {Col} from "react-bootstrap"
import {BsBriefcase, BsBucket} from "react-icons/bs"
import {BiGitCommit} from "react-icons/bi"
import {WOQLClientObj} from '../init-woql-client'
import {DatabaseInfoControl} from "../hooks/DatabaseInfoControl"
import {BranchControl} from "../hooks/BranchControl"
import {DBContextObj} from "../hooks/DBContext"


export const DataProductSummary = ({dataProductDetails}) => {

    const {woqlClient, dataProduct} = WOQLClientObj()
    const {branches, branch, ref, updateBranches}=DBContextObj()

    

    return <div className="d-flex mb-5">
        <div class="col-4 col-xl">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center gx-0">
                        <div class="col">
                            <h6 class="text-uppercase text-muted mb-2">
                            Collections
                            </h6>
                            <span class="h2 mb-0">
                            5
                            </span>
                        </div>
                        <div class="col-auto">
                            <span class="h2 text-muted mb-0"><BsBriefcase/></span>
                        </div>
                    </div> 
                </div>
            </div>
        </div>

        <div class="col-4 col-xl">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center gx-0">
                        <div class="col">
                            <h6 class="text-uppercase text-muted mb-2">
                            Size
                            </h6>
                            <span class="h2 mb-0">
                            345 KB
                            </span>
                        </div>
                        <div class="col-auto">
                            <span class="h2 text-muted mb-0"><BsBucket/></span>
                        </div>
                    </div> 
                </div>
            </div>
        </div>

        <div class="col-4 col-xl">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center gx-0">
                        <div class="col">
                            <h6 class="text-uppercase text-muted mb-2">
                            COMMITS
                            </h6>
                            <span class="h2 mb-0">
                            7344
                            </span>
                        </div>
                        <div class="col-auto">
                            <span class="h2 text-muted mb-0"><BiGitCommit/></span>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
}
