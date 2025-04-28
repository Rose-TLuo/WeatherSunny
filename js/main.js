document.addEventListener('DOMContentLoaded', function() {
    const serviceForm = document.getElementById('service-form');
    const serviceTypeSelect = document.getElementById('service-type');
    const serviceOptions = document.querySelectorAll('.service-options');
    const priceDisplay = document.getElementById('price-display');
    const priceInput = document.getElementById('price-input');
    const specialPeriodSelect = document.getElementById('special-period');

    const survivorSpecifyCheckbox = document.getElementById('survivor-specify');
    const survivorRoleRow = document.querySelector('#survivor-options .form-row:nth-child(2)');
    const survivorPointNowRow = document.querySelector('#survivor-options .form-row:nth-child(3)');
    const survivorPointTargetRow = document.querySelector('#survivor-options .form-row:nth-child(4)');
    const survivorRoleSelect = document.getElementById('survivor-role');
    const survivorPointNow = document.getElementById('survivor-point-now');
    const survivorPointTarget = document.getElementById('survivor-point-target');

    const survivorStarFrom1 = document.getElementById('survivor-star-from1');
    const survivorStarFrom2 = document.getElementById('survivor-star-from2');
    const survivorStarFrom3 = document.getElementById('survivor-star-from3');

    const survivorStarTo1 = document.getElementById('survivor-star-to1');
    const survivorStarTo2 = document.getElementById('survivor-star-to2');
    const survivorStarTo3 = document.getElementById('survivor-star-to3');

    const hunterSpecifyCheckbox = document.getElementById('hunter-specify');
    const hunterRoleRow = document.querySelector('#hunter-options .form-row:nth-child(2)');
    const hunterPointNowRow = document.querySelector('#hunter-options .form-row:nth-child(3)');
    const hunterPointTargetRow = document.querySelector('#hunter-options .form-row:nth-child(4)');
    const hunterRoleSelect = document.getElementById('hunter-role');
    const hunterPointNow = document.getElementById('hunter-point-now');
    const hunterPointTarget = document.getElementById('hunter-point-target');

    const hunterStarFrom1 = document.getElementById('hunter-star-from1');
    const hunterStarFrom2 = document.getElementById('hunter-star-from2');
    const hunterStarFrom3 = document.getElementById('hunter-star-from3');

    const hunterStarTo1 = document.getElementById('hunter-star-to1');
    const hunterStarTo2 = document.getElementById('hunter-star-to2');
    const hunterStarTo3 = document.getElementById('hunter-star-to3');

    // 价格配置
    const PRICE_CONFIG = {
        technical: {
            '0': 0,
            '1-3': 35,
            '4': 40,
            '5': 45,
            '6': 50,
            '7': 65,
            'top7': 75
        },
        entertainment: {
            '0': 0,
            'matching': 40,
            'koh': 50
        },
        survivor: {
            rank: {
                '1': 10,
                '2': 10,
                '3': 10,
                '4': 12,
                '5': 18,
                '6': 25,
                '7': 30,
                'top7':35
            },
            pointRates: [
                { min: 0, max: 2000, rate: 8 },
                { min: 2000, max: 4000, rate: 10 },
                { min: 4000, max: 6000, rate: 15 },
                { min: 6000, max: 8000, rate: 20 },
                { min: 8000, max: 10000, rate: 30 }
            ],
            starLevels: {
                '1': { levels: 3, starsPerLevel: 3 },
                '2': { levels: 4, starsPerLevel: 4 },
                '3': { levels: 5, starsPerLevel: 5 },
                '4': { levels: 5, starsPerLevel: 5 },
                '5': { levels: 5, starsPerLevel: 5 },
                '6': { levels: 5, starsPerLevel: 5 },
                '7': { levels: 1, starsPerLevel: 24 },
                'top7': { levels: 1, starsPerLevel: 200 }
            }
        },
        hunter: {
            rank: {
                '1': 10,
                '2': 10,
                '3': 10,
                '4': 12,
                '5': 15,
                '6': 20,
                '7': 28,
                'top7':32
            },
            pointRates: [
                { min: 0, max: 2000, rate: 8 },
                { min: 2000, max: 4000, rate: 10 },
                { min: 4000, max: 6000, rate: 15 },
                { min: 6000, max: 8000, rate: 20 },
                { min: 8000, max: 10000, rate: 30 }
            ],
            starLevels: {
                '1': { levels: 3, starsPerLevel: 3 },
                '2': { levels: 4, starsPerLevel: 4 },
                '3': { levels: 5, starsPerLevel: 5 },
                '4': { levels: 5, starsPerLevel: 5 },
                '5': { levels: 5, starsPerLevel: 5 },
                '6': { levels: 5, starsPerLevel: 5 },
                '7': { levels: 1, starsPerLevel: 24 },
                'top7': { levels: 1, starsPerLevel: 200 }
            }
        },
        weeklyLimit: 50,
        rank3: 30,
        training: 50,
        other: {
            'accompany': 35,
            'literature': 30,
            'tree-hole': 40,
            'voice-chat': 40,
            'affection': 60
        },
        specialPeriod: {
            'season': 1.2,
            'limited': 1.3
        }
    };

    function updateStarOptions(rankSelect, levelSelect, starInput) {
        const config = PRICE_CONFIG.survivor;
        const specialRanks = ['7', 'top7'];

        // 重置等级选项
        levelSelect.innerHTML = '<option value="">-- 请选择等级 --</option>';

        const selectedRank = rankSelect.value;
        const rankConfig = config.starLevels[selectedRank];

        // 如果选择了段位
        if (selectedRank && rankConfig) {
            if (specialRanks.includes(selectedRank)) {
                // 7阶和巅7没有等级选择
                levelSelect.disabled = true;
                levelSelect.innerHTML = '<option value="0">无等级</option>';
                starInput.max = rankConfig.starsPerLevel;
                starInput.min = 0;
                if (selectedRank ==='top7'){
                    starInput.min = 25;
                }
            } else {
                // 其他段位启用等级选择
                levelSelect.disabled = false;

                // 添加等级选项
                for (let i = 1; i <= rankConfig.levels; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    levelSelect.appendChild(option);
                }
            }

            // 启用/设置星数输入
            starInput.disabled = false;
            starInput.min = 0;
            starInput.max = rankConfig.starsPerLevel-1;
        } else {
            // 禁用等级和星数输入
            levelSelect.disabled = true;
            starInput.disabled = true;
        }
    }

    // 初始化起始段位选项
    updateStarOptions(survivorStarFrom1, survivorStarFrom2, survivorStarFrom3);

    // 初始化目标段位选项
    updateStarOptions(survivorStarTo1, survivorStarTo2, survivorStarTo3);

    // 添加事件监听器
    survivorStarFrom1.addEventListener('change', () =>
        updateStarOptions(survivorStarFrom1, survivorStarFrom2, survivorStarFrom3));

    survivorStarTo1.addEventListener('change', () =>
        updateStarOptions(survivorStarTo1, survivorStarTo2, survivorStarTo3));

    // 初始化起始段位选项
    updateStarOptions(hunterStarFrom1, hunterStarFrom2, hunterStarFrom3);

    // 初始化目标段位选项
    updateStarOptions(hunterStarTo1, hunterStarTo2, hunterStarTo3);

    // 添加事件监听器
    hunterStarFrom1.addEventListener('change', () =>
        updateStarOptions(hunterStarFrom1, hunterStarFrom2, hunterStarFrom3));

    hunterStarTo1.addEventListener('change', () =>
        updateStarOptions(hunterStarTo1, survivorStarTo2, survivorStarTo3));

    function toggleRoleOptions(checkbox, roleRow, pointNowRow, pointTargetRow, roleSelect, pointNowInput, pointTargetInput, calculateFn) {
        const isSpecified = checkbox.checked;

        // 控制角色选择行的显示
        if (roleRow) roleRow.style.display = isSpecified ? 'block' : 'none';

        // 控制当前认知分行的显示
        if (pointNowRow) pointNowRow.style.display = isSpecified ? 'block' : 'none';

        // 控制目标认知分行的显示
        if (pointTargetRow) pointTargetRow.style.display = isSpecified ? 'block' : 'none';

        // 重置输入框和选择框
        if (!isSpecified) {
            if (roleSelect) roleSelect.selectedIndex = 0;
            if (pointNowInput) pointNowInput.value = 0;
            if (pointTargetInput) pointTargetInput.value = 0;
        }

        // 重新计算价格函数（作为参数传入，支持不同需求）
        if (typeof calculateFn === 'function') calculateFn();
    }

    if (survivorRoleRow) survivorRoleRow.style.display = 'none';
    if (survivorPointNowRow) survivorPointNowRow.style.display = 'none';
    if (survivorPointTargetRow) survivorPointTargetRow.style.display = 'none';

// 例：hunter同理初始化...
    if (hunterRoleRow) hunterRoleRow.style.display = 'none';
    if (hunterPointNowRow) hunterPointNowRow.style.display = 'none';
    if (hunterPointTargetRow) hunterPointTargetRow.style.display = 'none';

    survivorSpecifyCheckbox.addEventListener('change', function() {
        toggleRoleOptions(
            survivorSpecifyCheckbox,
            survivorRoleRow,
            survivorPointNowRow,
            survivorPointTargetRow,
            survivorRoleSelect,
            survivorPointNow,
            survivorPointTarget,
            calculatePrice
        );
    });

    hunterSpecifyCheckbox.addEventListener('change', function() {
        toggleRoleOptions(
            hunterSpecifyCheckbox,
            hunterRoleRow,
            hunterPointNowRow,
            hunterPointTargetRow,
            hunterRoleSelect,
            hunterPointNow,
            hunterPointTarget,
            calculatePrice
        );
    });

    function calculatePointPrice(role, pointNow, pointTarget) {
        if (pointNow >= pointTarget) return 0;

        const pointRates = PRICE_CONFIG[role].pointRates;
        let total = 0;
        let cur = pointNow;

        for (let i = 0; i < pointRates.length; i++) {
            const { min, max, rate } = pointRates[i];
            // 目标分已超当前区间，处理这区间的份额
            if (cur < max && pointTarget > min) {
                // 区间内起点
                const start = Math.max(cur, min);
                // 区间终点
                const end = Math.min(pointTarget, max);
                // 区间内可加的分数
                if (end > start) {
                    total += (end - start) * rate/100;
                }
            }
            // 若目标分未进入下一区间，可退出
            if (pointTarget <= max) break;
        }

        return total;
    }

    function calculateStarPrice(role,fromRank1, fromRank2, fromStars, toRank1, toRank2, toStars) {
        const config = PRICE_CONFIG[role];

        if (!fromRank1 || !toRank1) return 0;

        // 转成数字再做比较
        let fRank = parseInt(fromRank1);
        let tRank = parseInt(toRank1);
        let fSeg = parseInt(fromRank2);
        let tSeg = parseInt(toRank2);
        let fStar = parseInt(fromStars);
        let tStar = parseInt(toStars);

        if (fRank > tRank) return 0; // 大段位必须升序
        if (fRank === tRank) {
            // 小段（段内数字递减）必须降序：【大到小】
            if (fSeg < tSeg) return 0; // 例如从3升到2是对的，从2升到3不对
            if (fSeg === tSeg) {
                if (fStar >= tStar) return 0; // 星星要递增，等于没意义
            }
        }
        let totalPrice = 0;

        let curRank = String(fromRank1);
        let curSeg = parseInt(fromRank2 || 1);
        let curStar = parseInt(fromStars);

        const toRank = String(toRank1);
        const toSeg = parseInt(toRank2 || 1);
        const toStar = parseInt(toStars);
        console.log(curRank)
        // 获取本段当前小段最大星数
        function getMaxStars(rank) {
            return config.starLevels[String(rank)].starsPerLevel;
        }

        // 获取本段总小段数量
        function getMaxSeg(rank) {
            return config.starLevels[String(rank)].levels;
        }

        // 单颗星价格
        function getPricePerStar(rank) {
            return config.rank[String(rank)];
        }

        function isArrived() {
            return curRank === toRank && curSeg === toSeg && curStar === toStar;
        }

        function isSpecialRank(r) {
            return r === "7" || r === "top7";
        }

        while (!isArrived()) {
            // 对特殊段位（7和top7）：没有小段，只有一条线按星走
            if (isSpecialRank(curRank)) {
                curStar++;
                totalPrice += getPricePerStar(curRank);
            } else {
                // 正常段位加星
                curStar++;
                totalPrice += getPricePerStar(curRank);

                // 星满进入下一小段或段位
                if (curStar >= getMaxStars(curRank)) {
                    curStar = 0;
                    if (curSeg === 1) {
                        // 段位+1，更新最大小段
                        let nextRank = String(Number(curRank) + 1);
                        curRank = nextRank;
                        curSeg = getMaxSeg(curRank);
                    } else {
                        curSeg -= 1;
                    }
                }
            }
        }
        return totalPrice;
    }

    // 隐藏所有服务选项
    function hideAllServiceOptions() {
        serviceOptions.forEach(option => {
            option.style.display = 'none';
        });
    }

    // 显示对应的服务选项
    function showServiceOptions(serviceType) {
        hideAllServiceOptions();
        const selectedOptions = document.getElementById(`${serviceType}-options`);
        if (selectedOptions) {
            selectedOptions.style.display = 'block';
        }
    }

    // 获取选定服务的价格
    function getServicePrice(serviceType) {
        let basePrice = 0;
        switch (serviceType) {
            case 'technical':
                const technicalLevel = document.getElementById('technical-level').value;
                const technicalHours = document.getElementById('technical-hours').value;
                basePrice = (PRICE_CONFIG.technical[technicalLevel] || 0) * technicalHours;
                break;

            case 'entertainment':
                const entertainmentType = document.getElementById('entertainment-type').value;
                const entertainmentHours = document.getElementById('entertainment-hours').value;
                basePrice = (PRICE_CONFIG.entertainment[entertainmentType] || 0) * entertainmentHours;
                break;

            case 'survivor':
                const isSurvivorSpecify = document.getElementById('survivor-specify').checked;

                // 计算星级价格
                const starPrice = calculateStarPrice('survivor',survivorStarFrom1.value,survivorStarFrom2.value, survivorStarFrom3.value,
                    survivorStarTo1.value, survivorStarTo2.value, survivorStarTo3.value);
                basePrice = starPrice;

                // 如果指定角色，计算认知分加价
                if (isSurvivorSpecify) {
                    const pointNow = parseInt(document.getElementById('survivor-point-now').value || 0);
                    const pointTarget = parseInt(document.getElementById('survivor-point-target').value || 0);

                    const pointPrice = calculatePointPrice('survivor',pointNow, pointTarget);
                    basePrice += pointPrice;
                }
                break;

            case 'weekly-limit':
                const weeklyLimitNum = document.getElementById('weekly-limit-num').value;
                basePrice = PRICE_CONFIG.weeklyLimit * weeklyLimitNum;
                break;

            case 'rank-3':
                const rank3Num = document.getElementById('rank-3-num').value;
                basePrice = PRICE_CONFIG.rank3 * rank3Num;
                break;

            case 'training':
                const trainingNum = document.getElementById('training-num').value;
                basePrice = PRICE_CONFIG.training * trainingNum;
                break;

            case 'other':
                const otherType = document.getElementById('other-type').value;
                const otherHours = document.getElementById('other-hours').value;
                basePrice = (PRICE_CONFIG.other[otherType] || 0) * otherHours;
                break;

            default:
                basePrice = 0;
        }
        return basePrice;
    }

    // 计算价格
    function calculatePrice() {
        const serviceType = serviceTypeSelect.value;
        const specialPeriod = specialPeriodSelect.value;

        let basePrice = getServicePrice(serviceType);

        // 特殊时段加价
        if (PRICE_CONFIG.specialPeriod[specialPeriod]) {
            basePrice *= PRICE_CONFIG.specialPeriod[specialPeriod];
        }

        priceDisplay.textContent = basePrice.toFixed(2);
        priceInput.value = basePrice.toFixed(2);
    }

    // 服务类型变更事件
    serviceTypeSelect.addEventListener('change', function() {
        showServiceOptions(this.value);
        calculatePrice();
    });

    // 各种输入变更事件
    document.querySelectorAll('select, input[type="number"]').forEach(input => {
        input.addEventListener('change', calculatePrice);
    });

    // 提交表单
    serviceForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 表单验证
        const serviceType = serviceTypeSelect.value;
        if (!serviceType) {
            alert('请选择服务类型');
            return;
        }

        // 可以在这里添加更多的表单验证逻辑

        // 提交逻辑
        const formData = new FormData(serviceForm);
        const orderData = Object.fromEntries(formData.entries());

        console.log('订单提交数据:', orderData);
        alert('订单提交成功！总价：' + priceDisplay.textContent);
    });

    // 初始化
    hideAllServiceOptions();


    survivorSpecifyCheckbox.addEventListener('change', function() {
        survivorRoleSelect.disabled = !this.checked;
        calculatePrice();
    });

// 在各种输入变更事件中添加
    document.querySelectorAll('select, input[type="number"], input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', calculatePrice);
    });
});